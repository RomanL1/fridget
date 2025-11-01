package ch.fridget.fridget.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

import ch.fridget.fridget.domain.dto.ProductInfoTask;
import lombok.RequiredArgsConstructor;

/**
 * Example service demonstrating how to use the AsyncProductInfoWorker singleton.
 * This shows best practices for enqueuing product information tasks.
 */
@Service
@RequiredArgsConstructor
public class ProductInfoService
{
	private final AsyncProductInfoWorker asyncProductInfoWorker;

	public boolean submitProductForProcessing ( final ProductInfoTask productInfoTask )
	{
		if ( asyncProductInfoWorker.getRemainingSize() > 0 )
		{
			return asyncProductInfoWorker.enqueue( productInfoTask );
		}
		return false;
	}
}

