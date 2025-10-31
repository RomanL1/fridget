package ch.fridget.fridget.api;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.InventoryItem;
import ch.fridget.fridget.domain.dto.api.InventoryItemDto;
import ch.fridget.fridget.repository.InventoryItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class InventoryItemController implements APIController
{
	private static final String prefix = "inventory-item";
	private final InventoryItemRepository inventoryItemRepository;

	@GetMapping( prefix )
	public ResponseEntity<List<InventoryItemDto>> addInventoryItem (
			@RequestHeader( "userCode" ) String userCode )
	{
		List<InventoryItem> inventoryItems = inventoryItemRepository.findByUserUserCode( userCode );

		if ( inventoryItems.isEmpty() )
		{
			log.info( "No inventory items found for user with userCode: {}", userCode );
			return ResponseEntity.ok( List.of() );
		}
		Instant now = Instant.now();

		/**
		 * Sort inventory items as follows:
		 * 1. Expired items (best before date before now), sorted by best before date ascending
		 * 2. Items expiring in the next 3 days (best before date after now and before now + 3 days), sorted by date added ascending
		 * 3. Items not expired (best before date after now + 3 days), sorted by date added ascending
		 */
		List<InventoryItem> expired = inventoryItems.stream()
				.filter( item -> item.getBestBeforeDate().isBefore( now ) )
				.sorted( Comparator.comparing( InventoryItem::getBestBeforeDate ) )
				.toList();

		List<InventoryItem> expiresIn3Days = inventoryItems.stream()
				.filter( item -> item.getBestBeforeDate().isAfter( now )
						&& item.getBestBeforeDate().isBefore( now.plus( 3, ChronoUnit.DAYS ) ) )
				.sorted( Comparator.comparing( InventoryItem::getDateAddedAt ) )
				.toList();

		List<InventoryItem> notExpired = inventoryItems.stream()
				.filter( item -> item.getBestBeforeDate().isAfter( now.plus( 3, ChronoUnit.DAYS ) ) )
				.sorted( Comparator.comparing( InventoryItem::getDateAddedAt ) )
				.toList();

		expired.addAll( expiresIn3Days );
		expired.addAll( notExpired );

		List<InventoryItemDto> inventoryItemDtos = expired.stream()
				.map( InventoryItemDto::of )
				.toList();
		return ResponseEntity.ok( inventoryItemDtos );
	}
}
