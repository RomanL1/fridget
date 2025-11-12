package ch.fridget.fridget.api;

import static ch.fridget.fridget.common.Util.isEmptyString;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.InventoryItem;
import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.db.User;
import ch.fridget.fridget.domain.dto.ProductInfoTask;
import ch.fridget.fridget.domain.dto.api.CreateInventoryItemRequestDto;
import ch.fridget.fridget.domain.dto.api.CreateInventoryItemResponseDto;
import ch.fridget.fridget.domain.dto.api.InventoryItemDto;
import ch.fridget.fridget.repository.InventoryItemRepository;
import ch.fridget.fridget.repository.ProductRepository;
import ch.fridget.fridget.repository.UserRepository;
import ch.fridget.fridget.service.ProductInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class InventoryItemController implements APIController
{
	public static final String prefix = "inventory-item";

	private final InventoryItemRepository inventoryItemRepository;
	private final ProductRepository productRepository;
	private final UserRepository userRepository;
	private final ProductInfoService productInfoService;

	/**
	 * Creates or updates an inventory item for a user.
	 */
	@PutMapping( prefix )
	public ResponseEntity<CreateInventoryItemResponseDto> createOrUpdateInventoryItem (
			@RequestHeader( "userCode" ) String userCode,
			@RequestBody CreateInventoryItemRequestDto requestDto )
	{
		if ( isEmptyString( requestDto.getProductName() ) )
		{
			return ResponseEntity.badRequest().build();
		}

		Optional<User> user = userRepository.findUserByUserCode( userCode );
		if ( user.isEmpty() )
		{
			throw new IllegalStateException( "userCode " + userCode + " not found." );
		}

		Product product;
		if ( requestDto.getProductId() == null )
		{
			product = convertInventoryItemRequestDtoToManualProduct( requestDto );
			product = productRepository.save( product );
		}
		else
		{
			Optional<Product> _product = productRepository.findById( UUID.fromString( requestDto.getProductId() ) );
			if ( _product.isEmpty() )
			{
				return ResponseEntity.notFound().build();
			}

			product = _product.get();

			if ( product.isIncomplete() )
			{
				overWriteProductWithDto( product, requestDto );

				product = productRepository.save( product );

				final ProductInfoTask task = ProductInfoTask.builder()
						.productId( product.getId() )
						.brandName( product.getBrandName() )
						.productName( product.getName() )
						.build();

				//the product is now complete, now we process it for category info asynchronously
				productInfoService.submitProductForProcessing( task );
			}
		}

		Instant bestBefore = requestDto.getBestBefore() != null ? Instant.parse( requestDto.getBestBefore() ) : null;
		InventoryItem inventoryItem = InventoryItem.builder()
				.id( UUID.randomUUID() )
				.product( product )
				.user( user.get() )
				.productName( product.getName() )
				.brandName( product.getBrandName() )
				.quantity( product.getQuantity() )
				.dateAddedAt( Instant.now() )
				.bestBeforeDate( bestBefore )
				.storedInFridge( true ) //default for now
				.opened( false )
				.build();

		inventoryItem = inventoryItemRepository.save( inventoryItem );

		CreateInventoryItemResponseDto responseDto = CreateInventoryItemResponseDto.builder()
				.inventoryItemId( inventoryItem.getId().toString() )
				.productName( inventoryItem.getProductName() )
				.brandName( inventoryItem.getBrandName() )
				.quantity( inventoryItem.getQuantity() )
				.imageUrl( product.getImageUrl() )
				.bestBefore( bestBefore == null ? null : bestBefore.toString() )
				.build();

		return ResponseEntity.ok( responseDto );
	}

	@GetMapping( prefix )
	public ResponseEntity<List<InventoryItemDto>> listInventoryItems (
			@RequestHeader( "userCode" ) String userCode )
	{
		List<InventoryItem> inventoryItems = inventoryItemRepository.findByUserUserCode( userCode );

		if ( inventoryItems.isEmpty() )
		{
			log.info( "No inventory items found for user with userCode: {}", userCode );
			return ResponseEntity.ok( List.of() );
		}
		Instant now = Instant.now().truncatedTo( ChronoUnit.DAYS );

		List<InventoryItem> activeInventoryItems = inventoryItems.stream()
				.filter( item -> item.getDateConsumedAt() == null )
				.toList();

		/*
		 * Sort inventory items as follows:
		 * 1. Expired items (best before date before now), sorted by best before date ascending
		 * 2. Items expiring in the next 3 days (best before date after now and before now + 3 days), sorted by date added ascending
		 * 3. Items not expired (best before date after now + 3 days), sorted by date added ascending
		 */
		List<InventoryItem> expired = activeInventoryItems.stream()
				.filter( item -> item.getBestBeforeDate() != null )
				.filter( item -> item.getBestBeforeDate().isBefore( now ) )
				.sorted( Comparator.comparing( InventoryItem::getBestBeforeDate ) )
				.toList();

		List<InventoryItem> expiresIn3Days = activeInventoryItems.stream()
				.filter( item -> item.getBestBeforeDate() != null )
				.filter( item -> item.getBestBeforeDate().isAfter( now )
						&& item.getBestBeforeDate().isBefore( now.plus( 3, ChronoUnit.DAYS ) ) )
				.sorted( Comparator.comparing( InventoryItem::getDateAddedAt ) )
				.toList();

		List<InventoryItem> noExpiry = activeInventoryItems.stream()
				.filter( item -> item.getBestBeforeDate() == null )
				.sorted( Comparator.comparing( InventoryItem::getDateAddedAt ) )
				.toList();

		List<InventoryItem> notExpired = activeInventoryItems.stream()
				.filter( item -> item.getBestBeforeDate() != null )
				.filter( item -> item.getBestBeforeDate().isAfter( now.plus( 3, ChronoUnit.DAYS ) ) )
				.sorted( Comparator.comparing( InventoryItem::getDateAddedAt ) )
				.toList();

		List<InventoryItem> sortedInventoryItems = new ArrayList<>();
		sortedInventoryItems.addAll( expired );
		sortedInventoryItems.addAll( expiresIn3Days );
		sortedInventoryItems.addAll( noExpiry );
		sortedInventoryItems.addAll( notExpired );

		List<InventoryItemDto> inventoryItemDtos = sortedInventoryItems.stream()
				.map( InventoryItemDto::of )
				.toList();
		return ResponseEntity.ok( inventoryItemDtos );
	}

	@DeleteMapping( prefix )
	public ResponseEntity<Void> removeInventoryItem (
			@RequestHeader( "userCode" ) String userCode,
			@RequestParam String id )
	{
		Optional<InventoryItem> inventoryItem = inventoryItemRepository.findFirstByUserUserCodeAndId(
				userCode, UUID.fromString( id ) );
		if ( inventoryItem.isEmpty() || inventoryItem.get().getDateConsumedAt() != null )
		{
			log.warn( "No inventory item with id: {} found for user with userCode: {}", id, userCode );
			return ResponseEntity.notFound().build();
		}
		inventoryItem.get().setDateConsumedAt( Instant.now() );
		inventoryItemRepository.save( inventoryItem.get() );
		return ResponseEntity.ok().build();
	}

	private Product convertInventoryItemRequestDtoToManualProduct ( CreateInventoryItemRequestDto requestDto )
	{
		return Product.builder()
				.id( UUID.randomUUID() )
				.ean13( requestDto.getProductBarcode() )
				.brandName( requestDto.getProductBrandName() )
				.name( requestDto.getProductName() )
				.manuallyAddedByUser( true )
				.incomplete( false )
				.quantity( requestDto.getQuantity() )
				.imageUrl( requestDto.getProductImageUrl() )
				.build();
	}

	private void overWriteProductWithDto ( Product existingProduct, CreateInventoryItemRequestDto requestDto )
	{
		existingProduct.setName( requestDto.getProductName() );
		existingProduct.setBrandName( requestDto.getProductBrandName() );
		if ( !isEmptyString( requestDto.getQuantity() ) )
		{
			existingProduct.setQuantity( requestDto.getQuantity() );
		}
		if ( !isEmptyString( requestDto.getProductBarcode() ) )
		{
			existingProduct.setEan13( requestDto.getProductBarcode() );
		}
		if ( !isEmptyString( requestDto.getProductImageUrl() ) )
		{
			existingProduct.setImageUrl( requestDto.getProductImageUrl() );
		}
		existingProduct.setIncomplete( false );
	}

}
