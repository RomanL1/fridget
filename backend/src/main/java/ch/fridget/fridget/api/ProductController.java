package ch.fridget.fridget.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.dto.api.ProductDto;
import ch.fridget.fridget.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ProductController implements APIController
{
	public static final String PREFIX = "product";

	private final ProductRepository productRepository;

	@GetMapping( PREFIX )
	public ResponseEntity<List<ProductDto>> listInventoryItems (
			@RequestParam( required = false ) String searchTerm )
	{
		List<Product> products = productRepository.searchProductsBySearchTerm( searchTerm );

		if ( products.isEmpty() )
		{
			log.info( "No products found with searchTerm: {}", searchTerm );
			return ResponseEntity.ok( List.of() );
		}

		List<ProductDto> inventoryItemDtos = products.stream()
				.map( this::convertToDto )
				.toList();
		return ResponseEntity.ok( inventoryItemDtos );
	}

	private ProductDto convertToDto ( Product product )
	{
		return ProductDto.builder()
				.id( product.getId().toString() )
				.ean13( product.getEan13() )
				.brandName( product.getBrandName() )
				.name( product.getName() )
				.quantity( product.getQuantity() )
				.category( product.getCategory() )
				.subCategory( product.getSubCategory() )
				.imageUrl( product.getImageUrl() )
				.build();
	}

}
