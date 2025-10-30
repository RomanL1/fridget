package ch.fridget.fridget.domain.dto;

import java.util.UUID;

import lombok.Builder;

/**
 * Record representing a product information processing task.
 * Contains the essential information needed to process product data asynchronously.
 *
 * @param productId the unique identifier of the product
 * @param brandName the brand name of the product
 * @param productName the name of the product
 */
@Builder
public record ProductInfoTask(
		UUID productId,
		String brandName,
		String productName
)
{
}

