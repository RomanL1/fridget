package ch.fridget.fridget.api;

import static ch.fridget.fridget.common.Util.isEmptyString;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.jspecify.annotations.NonNull;
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
import ch.fridget.fridget.domain.dto.api.CreateOrUpdateInventoryItemRequestDto;
import ch.fridget.fridget.domain.dto.api.CreateOrUpdateInventoryItemResponseDto;
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
	public static final String PREFIX = "inventory-item";

	private final InventoryItemRepository inventoryItemRepository;
	private final ProductRepository productRepository;
	private final UserRepository userRepository;
	private final ProductInfoService productInfoService;

	/**
	 * Creates or updates an inventory item for a user.
	 */
	@PutMapping( PREFIX )
	public ResponseEntity<CreateOrUpdateInventoryItemResponseDto> createOrUpdateInventoryItem (
			@RequestHeader( "userCode" ) String userCode,
			@RequestBody CreateOrUpdateInventoryItemRequestDto requestDto )
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

			final ProductInfoTask task = ProductInfoTask.builder()
					.productId( product.getId() )
					.brandName( product.getBrandName() )
					.productName( product.getName() )
					.build();

			//the product is new, now process it for ingredientName asynchronously
			productInfoService.submitProductForProcessing( task );
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

				//the product is now complete, now process it for ingredientName asynchronously
				productInfoService.submitProductForProcessing( task );
			}
		}

		InventoryItem inventoryItem;
		Instant bestBefore = requestDto.getBestBefore() != null ? Instant.parse( requestDto.getBestBefore() ) : null;

		if (requestDto.getInventoryItemId() != null) {
			// Edit existing inventory item
			Optional<InventoryItem> storedInventoryItem = inventoryItemRepository.findById(UUID.fromString(requestDto.getInventoryItemId()));

			if (storedInventoryItem.isEmpty()) {
				return ResponseEntity.notFound().build();
			}

			inventoryItem = storedInventoryItem.get();

			overWriteInventoryItemWithDto(inventoryItem, requestDto);
		} else {
			// Create new inventory item
			inventoryItem = InventoryItem.builder()
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
		}

		inventoryItem = inventoryItemRepository.save( inventoryItem );

		CreateOrUpdateInventoryItemResponseDto responseDto = CreateOrUpdateInventoryItemResponseDto.builder()
				.inventoryItemId( inventoryItem.getId().toString() )
				.productId( product.getId().toString() )
				.productName( inventoryItem.getProductName() )
				.brandName( inventoryItem.getBrandName() )
				.quantity( inventoryItem.getQuantity() )
				.imageUrl( product.getImageUrl() )
				.bestBefore( bestBefore == null ? null : bestBefore.toString() )
				.build();

		return ResponseEntity.ok( responseDto );
	}

	@GetMapping( PREFIX )
	public ResponseEntity<List<InventoryItemDto>> listInventoryItems (
			@RequestHeader( "userCode" ) String userCode )
	{
		List<InventoryItem> inventoryItems = inventoryItemRepository.findByUserUserCode( userCode );

		if ( inventoryItems.isEmpty() )
		{
			log.info( "No inventory items found for user with userCode: {}", userCode );
			return ResponseEntity.ok( List.of() );
		}

		List<InventoryItem> activeInventoryItems = sortInventoryItems( inventoryItems );

		List<InventoryItemDto> inventoryItemDtos = activeInventoryItems.stream()
				.map( InventoryItemDto::of )
				.toList();
		return ResponseEntity.ok( inventoryItemDtos );
	}

	@GetMapping( PREFIX + "/with-ingredient-name" )
	public ResponseEntity<List<InventoryItemDto>> listInventoryItemsWithIngredientName (
			@RequestHeader( "userCode" ) String userCode )
	{
		List<InventoryItem> inventoryItems = inventoryItemRepository.findByUserUserCodeAndProductIngredientNameIsNotNull( userCode );

		if ( inventoryItems.isEmpty() )
		{
			log.info( "No inventory items found for user with userCode: {}", userCode );
			return ResponseEntity.ok( List.of() );
		}

		inventoryItems = inventoryItems.stream()
				.filter( i -> i.getProduct().getIngredientName() != null )
				.filter( i -> !i.getProduct().getIngredientName().isEmpty() )
				.filter( i -> !"null".equals( i.getProduct().getIngredientName()) )
				.toList();

		List<InventoryItem> activeInventoryItems = sortInventoryItems( inventoryItems );

		List<InventoryItemDto> inventoryItemDtos = activeInventoryItems.stream()
				.map( InventoryItemDto::of )
				.toList();
		return ResponseEntity.ok( inventoryItemDtos );
	}

	private static @NonNull List<InventoryItem> sortInventoryItems ( List<InventoryItem> inventoryItems )
	{
		final long DAYS_BEFORE_EXPIRATION = 3;
		Instant now = Instant.now().truncatedTo( ChronoUnit.DAYS );
		Instant soon = now.plus(DAYS_BEFORE_EXPIRATION, ChronoUnit.DAYS);

		/*
		 * Sort inventory items as follows:
		 * 1. Expired items
		 * 2. Items expiring in the next 3 days
		 * 3. Items not expiring anytime soon (or expiration date not specified)
		 */
		return inventoryItems.stream()
				.filter( item -> item.getDateConsumedAt() == null )
				.sorted(Comparator
						.comparingInt((InventoryItem item) -> {
							if (item.getBestBeforeDate() == null) {
								return 3;
							}

							// Already expired
							if (item.getBestBeforeDate().isBefore(now)) return 1;

							// Expiring soon
							if (item.getBestBeforeDate().isBefore(soon)) return 2;

							// Not expiring anytime soon
							return 3;
						})
						.thenComparing(Comparator.comparing(InventoryItem::getDateAddedAt).reversed())
				)
				.toList();
	}

	@DeleteMapping( PREFIX )
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

	private Product convertInventoryItemRequestDtoToManualProduct ( CreateOrUpdateInventoryItemRequestDto requestDto )
	{
		return Product.builder()
				.id( UUID.randomUUID() )
				.ean13( requestDto.getProductBarcode() )
				.brandName( requestDto.getBrandName() )
				.name( requestDto.getProductName() )
				.manuallyAddedByUser( true )
				.incomplete( false )
				.quantity( requestDto.getQuantity() )
				.imageUrl( requestDto.getImageUrl() )
				.build();
	}

	private void overWriteProductWithDto ( Product existingProduct, CreateOrUpdateInventoryItemRequestDto requestDto )
	{
		existingProduct.setName( requestDto.getProductName() );
		existingProduct.setBrandName( requestDto.getBrandName() );
		if ( !isEmptyString( requestDto.getQuantity() ) )
		{
			existingProduct.setQuantity( requestDto.getQuantity() );
		}
		if ( !isEmptyString( requestDto.getProductBarcode() ) )
		{
			existingProduct.setEan13( requestDto.getProductBarcode() );
		}
		if ( !isEmptyString( requestDto.getImageUrl() ) )
		{
			existingProduct.setImageUrl( requestDto.getImageUrl() );
		}
		existingProduct.setIncomplete( false );
	}

	private static void overWriteInventoryItemWithDto (InventoryItem existingInventoryItem, CreateOrUpdateInventoryItemRequestDto request )
	{
		existingInventoryItem.setProductName(request.getProductName());
		existingInventoryItem.setBrandName(request.getBrandName());
		existingInventoryItem.setQuantity(request.getQuantity());

		Instant bestBeforeDate = request.getBestBefore() != null ? Instant.parse( request.getBestBefore() ) : null;
		existingInventoryItem.setBestBeforeDate(bestBeforeDate);
	}
}
