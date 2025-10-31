package ch.fridget.fridget.domain.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddInventoryItemRequestDto
{
	private String productId; // optional
	private String productBarcode; // optional
	private String productName;
	private String productBrandName;
	private String productImageUrl; // optional
	private String productQuantity; //optional
	private String quantity;
	//expected in utc iso 8601
	private String bestBefore; // optional
}
