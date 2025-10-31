package ch.fridget.fridget.domain.dto.api;

import ch.fridget.fridget.domain.db.InventoryItem;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InventoryItemDto
{
	private String inventoryItemId;
	private String productId;
	private String productName;
	private String brandName;
	private String quantity;
	private String imageUrl;
	private String bestBeforeDate; // in utc iso 8601

	public static InventoryItemDto of ( InventoryItem inventoryItem )
	{
		return InventoryItemDto.builder()
				.inventoryItemId( inventoryItem.getId().toString() )
				.productId( inventoryItem.getProduct().getId().toString() )
				.productName( inventoryItem.getProduct().getName() )
				.brandName( inventoryItem.getProduct().getBrandName() )
				.quantity( inventoryItem.getProduct().getQuantity() )
				.imageUrl( inventoryItem.getProduct().getImageUrl() )
				.bestBeforeDate( inventoryItem.getBestBeforeDate() != null ?
						inventoryItem.getBestBeforeDate().toString() :
						null )
				.build();
	}
}
