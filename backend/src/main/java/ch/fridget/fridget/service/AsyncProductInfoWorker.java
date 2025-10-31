package ch.fridget.fridget.service;

import java.util.Optional;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.dto.ProductInfoTask;
import ch.fridget.fridget.domain.ollama.ProductCategoryInfo;
import ch.fridget.fridget.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

/**
 * Singleton service that asynchronously processes product information tasks.
 * Uses a blocking queue to handle tasks in a separate thread pool.
 * This is a Spring-managed singleton (default scope).
 */
@Component
public class AsyncProductInfoWorker
{
	private static final Logger logger = LoggerFactory.getLogger( AsyncProductInfoWorker.class );
	private static final int QUEUE_CAPACITY = 1000;
	private static final int THREAD_POOL_SIZE = 1;

	private final BlockingQueue<ProductInfoTask> taskQueue;
	private final ExecutorService executorService;
	private final OllamaService ollamaService;
	private final AtomicBoolean running;
	private final ProductRepository productRepository;

	public AsyncProductInfoWorker ( OllamaService ollamaService, ProductRepository productRepository )
	{
		this.taskQueue = new LinkedBlockingQueue<>( QUEUE_CAPACITY );
		this.executorService = Executors.newFixedThreadPool( THREAD_POOL_SIZE );
		this.running = new AtomicBoolean( false );
		this.ollamaService = ollamaService;
		this.productRepository = productRepository;
	}

	/**
	 * Initializes the worker and starts processing tasks.
	 * Called automatically by Spring after bean construction.
	 */
	@PostConstruct
	public void start ()
	{
		running.set( true );
		logger.info( "Starting AsyncProductInfoWorker with {} threads", THREAD_POOL_SIZE );

		// Start worker threads
		for ( int i = 0; i < THREAD_POOL_SIZE; i++ )
		{
			executorService.submit( this::processQueue );
		}
	}

	/**
	 * Gracefully shuts down the worker.
	 * Called automatically by Spring before bean destruction.
	 */
	@PreDestroy
	public void shutdown ()
	{
		logger.info( "Shutting down AsyncProductInfoWorker" );
		running.set( false );
		executorService.shutdown();

		try
		{
			if ( !executorService.awaitTermination( 60, java.util.concurrent.TimeUnit.SECONDS ) )
			{
				executorService.shutdownNow();
			}
		}
		catch ( InterruptedException e )
		{
			executorService.shutdownNow();
			Thread.currentThread().interrupt();
		}
	}

	public boolean enqueue ( ProductInfoTask task )
	{
		if ( task == null )
		{
			logger.warn( "Attempted to enqueue null task" );
			return false;
		}

		boolean added = taskQueue.offer( task );
		if ( added )
		{
			logger.debug( "Enqueued task for product: {} ({})", task.productName(), task.productId() );
		}
		else
		{
			logger.warn( "Queue is full, unable to enqueue task for product: {}", task.productId() );
		}

		return added;
	}

	public int getRemainingSize ()
	{
		return taskQueue.remainingCapacity();
	}

	private void processQueue ()
	{
		while ( running.get() )
		{
			try
			{
				ProductInfoTask task = taskQueue.poll( 1, java.util.concurrent.TimeUnit.SECONDS );

				if ( task != null )
				{
					processTask( task );
				}
			}
			catch ( InterruptedException e )
			{
				Thread.currentThread().interrupt();
				logger.info( "Worker thread interrupted" );
				break;
			}
			catch ( Exception e )
			{
				logger.error( "Error processing task", e );
			}
		}
	}

	private void processTask ( ProductInfoTask task )
	{
		logger.info( "Processing product info - ID: {}, Brand: {}, Name: {}",
				task.productId(), task.brandName(), task.productName() );

		try
		{
			ProductCategoryInfo productCategoryInfo = ollamaService.generateProductInfo( task );
			Optional<Product> product = productRepository.findById( task.productId() );
			if ( product.isEmpty() )
			{
				throw new IllegalStateException( "Product not found: " + task.productId() );
			}

			Product p = product.get();
			p.setCategory( productCategoryInfo.getCategory() );
			p.setSubCategory( productCategoryInfo.getSubCategory() );
			productRepository.save( p );
			logger.info( "Updated product {} with category: {}, subCategory: {}",
					task.productId(),
					productCategoryInfo.getCategory(),
					productCategoryInfo.getSubCategory() );

			logger.debug( "Completed processing for product: {}", task.productId() );
		}
		catch ( Exception e )
		{
			if (!taskQueue.offer(task)) {
				logger.error("Failed to re-queue product info task: queue is full. Product ID: {}", task.productId());
			}
			logger.error( "Error processing product info", e );
		}

	}
}
