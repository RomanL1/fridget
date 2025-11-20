package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDto
{
	private String id;
	private String ean13;
	private String brandName;
	private String name;
	private String quantity;
	private String ingredientName;
	private String imageUrl;
}
