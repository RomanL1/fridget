package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChefkochRecipeResponseDto
{
	private String title;
	private Double rating;
	private String originURL;
	private Integer ratingCount;
	private String imageUrl;
}
