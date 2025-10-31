package ch.fridget.fridget.domain.ollama;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategoryInfo
{
	private String category;
	private String subCategory;
}