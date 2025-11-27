package ch.fridget.fridget.api;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.db.ShoppingListItem;
import ch.fridget.fridget.domain.db.User;
import ch.fridget.fridget.domain.dto.api.ShoppingListItemDto;
import ch.fridget.fridget.repository.ProductRepository;
import ch.fridget.fridget.repository.ShoppingListItemRepository;
import ch.fridget.fridget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ShoppingListController implements APIController
{
	public static final String PREFIX = "shopping-list";

	private final ShoppingListItemRepository shoppingListItemRepository;
	private final ProductRepository productRepository;
	private final UserRepository userRepository;

	@GetMapping( PREFIX )
	public ResponseEntity<List<ShoppingListItemDto>> getShoppingList ( @RequestHeader( "userCode" ) String userCode )
	{
		List<ShoppingListItem> shoppingList = shoppingListItemRepository.findAllByUserUserCode( userCode );

		if ( shoppingList.isEmpty() )
		{
			log.info( "ShoppingList is empty for userCode: {}", userCode );
			return ResponseEntity.ok( List.of() );
		}

		List<ShoppingListItemDto> shoppingListDto = shoppingList.stream()
				.map( this::convertToDto )
				.toList();
		return ResponseEntity.ok( shoppingListDto );
	}

	@PutMapping( PREFIX + "/item" )
	public ResponseEntity<ShoppingListItemDto> createOrUpdateItem ( @RequestHeader( "userCode" ) String userCode,
			@RequestBody ShoppingListItemDto shoppingListItemDto )
	{
		if ( ObjectUtils.isEmpty( shoppingListItemDto.getName() ) )
		{
			return ResponseEntity.badRequest().build();
		}

		if ( !ObjectUtils.isEmpty( shoppingListItemDto.getId() ) )
		{
			boolean exists = shoppingListItemRepository.existsById( UUID.fromString( shoppingListItemDto.getId() ) );
			if ( !exists )
			{
				log.info( "The given ShoppingListItem Id does not exist." );
				return ResponseEntity.badRequest().build();
			}
		}

		Optional<Product> product = Optional.empty();
		if ( !ObjectUtils.isEmpty( shoppingListItemDto.getProductId() ) )
		{
			product = productRepository.findById(
					UUID.fromString( shoppingListItemDto.getProductId() ) );

			if ( product.isEmpty() )
			{
				log.info( "The given Product Id provided for shoppingListItem does not exist." );
				return ResponseEntity.badRequest().build();
			}
		}

		User user = userRepository.findUserByUserCode( userCode ).orElseThrow();

		ShoppingListItem itemToSaveOrUpdate = convertToDbEntity( shoppingListItemDto, product, user );

		ShoppingListItem saved = shoppingListItemRepository.save( itemToSaveOrUpdate );

		return ResponseEntity.ok( convertToDto( saved ) );
	}

	@PutMapping( PREFIX + "/item/{shopListItemId}/toggle-bought" )
	public ResponseEntity<ShoppingListItemDto> toggleBought ( @RequestHeader( "userCode" ) String userCode,
			@PathVariable String shopListItemId )
	{
		if ( ObjectUtils.isEmpty( shopListItemId ) )
		{
			return ResponseEntity.badRequest().build();
		}

		Optional<ShoppingListItem> shoppingListItemOpt = shoppingListItemRepository.findByUserUserCodeAndId( userCode,
				UUID.fromString( shopListItemId ) );

		if ( shoppingListItemOpt.isEmpty() )
		{
			log.info( "The given ShoppingListItem Id does not exist." );
			return ResponseEntity.notFound().build();
		}

		shoppingListItemOpt.get().setBought( !shoppingListItemOpt.get().getBought() );
		ShoppingListItem saved = shoppingListItemRepository.save( shoppingListItemOpt.get() );

		return ResponseEntity.ok( convertToDto( saved ) );
	}

	@DeleteMapping( PREFIX + "/item/{shopListItemId}" )
	public ResponseEntity<Void> deleteShoppingListItem ( @RequestHeader( "userCode" ) String userCode,
			@PathVariable String shopListItemId )
	{
		if ( ObjectUtils.isEmpty( shopListItemId ) )
		{
			return ResponseEntity.badRequest().build();
		}

		Optional<ShoppingListItem> shoppingListItemOpt = shoppingListItemRepository.findByUserUserCodeAndId( userCode,
				UUID.fromString( shopListItemId ) );

		if ( shoppingListItemOpt.isEmpty() )
		{
			log.info( "The given ShoppingListItem Id does not exist." );
			return ResponseEntity.notFound().build();
		}

		shoppingListItemRepository.delete( shoppingListItemOpt.get() );

		return ResponseEntity.ok().build();
	}

	private ShoppingListItemDto convertToDto ( ShoppingListItem shoppingListItem )
	{
		return ShoppingListItemDto.builder()
				.id( shoppingListItem.getId().toString() )
				.productId( shoppingListItem.getProduct() != null ?
						shoppingListItem.getProduct().getId().toString() :
						null )
				.description( shoppingListItem.getDescription() )
				.name( shoppingListItem.getName() )
				.quantity( shoppingListItem.getQuantity() )
				.bought( shoppingListItem.getBought() )
				.build();
	}

	private ShoppingListItem convertToDbEntity ( ShoppingListItemDto shoppingListItem, Optional<Product> product,
			User user )
	{
		return ShoppingListItem.builder()
				.id( ObjectUtils.isEmpty( shoppingListItem.getId() ) ?
						UUID.randomUUID() :
						UUID.fromString( shoppingListItem.getId() ) )
				.user( user )
				.product( product.orElse( null ) )
				.name( shoppingListItem.getName() )
				.description( shoppingListItem.getDescription() )
				.quantity( shoppingListItem.getQuantity() )
				.bought( shoppingListItem.getBought() != null ? shoppingListItem.getBought() : false )
				.build();
	}
}
