package ch.fridget.fridget.domain.dto.api;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChefkochRecipeRequestDto
{
	private List<String> ingredients;
	private Integer limit;
}
