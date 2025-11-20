package ch.fridget.fridget.domain.dto.api;

import java.util.UUID;

import lombok.Builder;
import lombok.Data;

/**
 * Data Transfer Object representing an item in a shopping list.
 * link to db entity: {@link ch.fridget.fridget.domain.db.ShoppingListItem}
 */
@Data
@Builder
public class ShoppingListItemDto
{
	private String id; // nullable
	private String productId; // nullable
	private String brandName; // nullable
	private String productName;
	private String quantity; // nullable
	@Builder.Default
	private Boolean bought = false;
}
