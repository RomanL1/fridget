package ch.fridget.fridget.api;

import static ch.fridget.fridget.common.Util.isEmptyString;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.InventoryItem;
import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.db.User;
import ch.fridget.fridget.domain.dto.AddInventoryItemRequestDto;
import ch.fridget.fridget.domain.dto.AddInventoryItemResponseDto;
import ch.fridget.fridget.repository.InventoryItemRepository;
import ch.fridget.fridget.repository.ProductRepository;
import ch.fridget.fridget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AddInventoryItemController implements APIController
{
	private final ProductRepository productRepository;
	private final InventoryItemRepository inventoryItemRepository;
	private final UserRepository userRepository;

	@PostMapping( "addInventoryItem" )
	public ResponseEntity<AddInventoryItemResponseDto> addInventoryItem (
			@RequestHeader( "userCode" ) String userCode,
			@RequestBody AddInventoryItemRequestDto requestDto )
	{
		if ( isEmptyString( requestDto.getQuantity() ) )
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
			product = convertAddInventoryItemRequestDtoToProduct( requestDto, true );
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

			if ( product.isIncomplete() && ( isEmptyString( requestDto.getProductName() ) || isEmptyString(
					requestDto.getProductBrandName() ) ) )
			{
				return ResponseEntity.badRequest().build();
			}

			if ( product.isIncomplete() )
			{
				overWriteProductWithDto( product, requestDto );

				product = productRepository.save( product );
			}
		}

		Instant bestBefore = requestDto.getBestBefore() != null ? Instant.parse( requestDto.getBestBefore() ) : null;
		InventoryItem inventoryItem = InventoryItem.builder()
				.id( UUID.randomUUID() )
				.user( user.get() )
				.product( product )
				.name( product.getBrandName() + " " + product.getName() )
				.bestBeforeDate( bestBefore )
				.storedInFridge( true ) //default for now
				.opened( false )
				.dateAddedAt( Instant.now() )
				.build();

		inventoryItem = inventoryItemRepository.save( inventoryItem );

		AddInventoryItemResponseDto responseDto = AddInventoryItemResponseDto.builder()
				.inventoryItemId( inventoryItem.getId().toString() )
				.productName( product.getName() )
				.brandName( product.getBrandName() )
				.quantity( product.getQuantity() )
				.imageUrl( product.getImageUrl() )
				.bestBefore( bestBefore == null ? null : bestBefore.toString() )
				.build();

		return ResponseEntity.ok( responseDto );
	}

	private Product convertAddInventoryItemRequestDtoToProduct ( AddInventoryItemRequestDto requestDto,
			boolean manuallyAddedByUser )
	{
		UUID uuid = requestDto.getProductId() == null ? UUID.randomUUID() : UUID.fromString( requestDto.getProductId() );
		return Product.builder()
				.id( uuid )
				.name( requestDto.getProductName() )
				.brandName( requestDto.getProductBrandName() )
				.quantity( requestDto.getProductQuantity() )
				.ean13( requestDto.getProductBarcode() )
				.imageUrl( requestDto.getProductImageUrl() )
				.manuallyAddedByUser( manuallyAddedByUser )
				.build();
	}

	private void overWriteProductWithDto ( Product existingProduct, AddInventoryItemRequestDto requestDto )
	{
		existingProduct.setName( requestDto.getProductName() );
		existingProduct.setBrandName( requestDto.getProductBrandName() );
		if ( !isEmptyString( requestDto.getProductQuantity() ) )
		{
			existingProduct.setQuantity( requestDto.getProductQuantity() );
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
