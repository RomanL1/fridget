package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateInventoryItemRequestDto
{
	private String productId; // optional
	private String productBarcode; // optional
	private String productName;
	private String productBrandName; // optional
	private String productImageUrl; // optional
	private String quantity; // optional
	//expected in utc iso 8601
	private String bestBefore; // optional
}
