package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateOrUpdateInventoryItemRequestDto
{
	private String inventoryItemId; // optional
	private String productId; // optional
	private String productBarcode; // optional
	private String productName;
	private String brandName; // optional
	private String imageUrl; // optional
	private String quantity; // optional
	//expected in utc iso 8601
	private String bestBefore; // optional
}
