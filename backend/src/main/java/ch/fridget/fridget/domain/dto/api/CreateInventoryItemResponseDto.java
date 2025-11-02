package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateInventoryItemResponseDto
{
	private String inventoryItemId;
	private String productName;
	private String brandName;
	private String quantity;
	private String imageUrl; // optional
	// in utc iso8601
	private String bestBefore; // optional

}
