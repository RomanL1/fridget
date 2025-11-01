package ch.fridget.fridget.domain.dto;

import java.util.UUID;

import lombok.Builder;

@Builder
public record ProductInfoTask(
		UUID productId,
		String brandName,
		String productName
)
{
}

