package ch.fridget.fridget.domain.dto.response;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ScanProductResponseDto
{
	private ESTATUS status;
	private UUID productId; //optional
	private String brandName; //optional
	private String productName; //optional
	private String quantity; //optional
	private String imageUrl; //optional
	public enum ESTATUS
	{
		PRODUCT_FOUND,
		PRODUCT_NOT_FOUND,
		PRODUCT_CREATED,
		PRODUCT_INCOMPLETE,
	}
}
