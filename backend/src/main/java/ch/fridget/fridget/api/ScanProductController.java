package ch.fridget.fridget.api;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.OFFProductResponse;
import ch.fridget.fridget.domain.db.Product;
import ch.fridget.fridget.domain.dto.ScanProductResponseDto;
import ch.fridget.fridget.repository.OFFProductResponseRepository;
import ch.fridget.fridget.repository.ProductRepository;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import kong.unirest.core.json.JSONObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ScanProductController implements APIController
{

	private final ProductRepository productRepository;
	private final OFFProductResponseRepository oFFProductResponseRepository;

	@PostMapping( "scanProduct/{ean13Barcode}" )
	public ResponseEntity<ScanProductResponseDto> scanProduct ( @PathVariable String ean13Barcode )
	{
		Optional<Product> existingProduct = productRepository.findProductByEan13( ean13Barcode );
		if ( existingProduct.isPresent() )
		{
			//product found
			log.info( "Product with ean13 barcode: {} found in our db", ean13Barcode );
			return ResponseEntity.ok( convertFoundProductToResponseDto( existingProduct.get(),
					ScanProductResponseDto.ESTATUS.PRODUCT_FOUND ) );
		}

		String uri = "https://world.openfoodfacts.org/api/v2/product/" + ean13Barcode;
		HttpResponse<JsonNode> response = Unirest.get( uri )
				.header( "accept", "application/json" )
				.asJson();

		if ( response.getStatus() != 200 || response.getBody() == null )
		{
			//product not found
			log.warn( "Product with ean13 barcode: {} NOT found on OFF", ean13Barcode );
			ScanProductResponseDto responseDto = ScanProductResponseDto.builder()
					.status( ScanProductResponseDto.ESTATUS.PRODUCT_NOT_FOUND )
					.build();
			return ResponseEntity.ok( responseDto );
		}

		OFFProductResponse offProductResponse = OFFProductResponse.builder()
				.id( UUID.randomUUID() )
				.ean13( ean13Barcode )
				.rawResponse( response.getBody().toString() )
				.build();
		oFFProductResponseRepository.save( offProductResponse );
		log.info( "Saved response from OFF for Product {}", ean13Barcode );

		OpenFoodFactsProductResponse offProduct = extractProductData( response.getBody() );

		ScanProductResponseDto.ESTATUS status = offProduct.incomplete()
				? ScanProductResponseDto.ESTATUS.PRODUCT_INCOMPLETE
				: ScanProductResponseDto.ESTATUS.PRODUCT_CREATED;

		if ( offProduct.incomplete() )
		{
			log.warn( "Product with ean13 barcode: {} found on OFF but incomplete", ean13Barcode );
		}

		//TODO category, subCategory, commonBestBeforeTimeRange

		Product newProduct = Product.builder()
				.id( UUID.randomUUID() )
				.ean13( ean13Barcode )
				.name( offProduct.productName() )
				.brandName( offProduct.brandName() )
				.imageUrl( offProduct.imageUrl() )
				.quantity( offProduct.quantity() )
				.incomplete( offProduct.incomplete() )
				.manuallyAddedByUser( false )
				.build();
		Product saved = productRepository.save( newProduct );
		log.info( "Created new Product with ean13 barcode: {} from OFF", ean13Barcode );

		ScanProductResponseDto responseDto = convertFoundProductToResponseDto( saved, status );
		return ResponseEntity.ok( responseDto );
	}

	private ScanProductResponseDto convertFoundProductToResponseDto ( Product product,
			ScanProductResponseDto.ESTATUS status )
	{
		return ScanProductResponseDto.builder()
				.status( status )
				.productId( product.getId() )
				.brandName( product.getBrandName() )
				.productName( product.getName() )
				.quantity( product.getQuantity() )
				.imageUrl( product.getImageUrl() )
				.build();
	}

	private OpenFoodFactsProductResponse extractProductData ( JsonNode offResponseBody )
	{
		JSONObject object = offResponseBody.getObject();
		String brandName = object.getJSONObject( "product" ).optString( "brands", "" );
		String productName = object.getJSONObject( "product" ).optString( "product_name", "" );
		String imageUrl = object.getJSONObject( "product" ).optString( "image_url", "" );
		String quantity = object.getJSONObject( "product" ).optString( "quantity", "" );

		boolean incomplete = brandName.isEmpty() || productName.isEmpty() || quantity.isEmpty();

		return new OpenFoodFactsProductResponse( incomplete, productName, brandName, imageUrl, quantity );
	}

	private record OpenFoodFactsProductResponse(
			boolean incomplete,
			String productName,
			String brandName,
			String imageUrl,
			String quantity
	)
	{
	}

}
