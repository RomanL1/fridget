package ch.fridget.fridget.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.InventoryItem;
import ch.fridget.fridget.domain.dto.api.ChefkochRecipeFilteredRequestDto;
import ch.fridget.fridget.domain.dto.api.ChefkochRecipeRequestDto;
import ch.fridget.fridget.domain.dto.api.ChefkochRecipeResponseDto;
import ch.fridget.fridget.repository.InventoryItemRepository;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.Unirest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RecipeController implements APIController
{
	public static final String PREFIX = "recipe";
	private final InventoryItemRepository inventoryItemRepository;

	@GetMapping( PREFIX + "/trending" )
	public ResponseEntity<ChefkochRecipeResponseDto[]> getTrendingRecipes ()
	{
		Map<String, Object> body = new HashMap<>();
		body.put( "limit", 3 );

		String uri = "http://localhost:5001/daily_recipes";
		HttpResponse<ChefkochRecipeResponseDto[]> response = Unirest.post( uri )
				.header( "accept", "application/json" )
				.header( "Content-Type", "application/json" )
				.body( body )
				.asObject( ChefkochRecipeResponseDto[].class );

		return ResponseEntity.ok( response.getBody() );
	}

	@PostMapping( PREFIX + "/filtered" )
	public ResponseEntity<ChefkochRecipeResponseDto[]> getFilteredRecipes (
			@RequestHeader( "userCode" ) String userCode,
			@RequestBody ChefkochRecipeFilteredRequestDto requestDto )
	{
		List<UUID> ids = requestDto.getInventoryItemIds().stream().map( UUID::fromString ).toList();

		List<InventoryItem> inventoryItems = inventoryItemRepository.findAllByUserUserCodeAndIdIn( userCode, ids );

		List<String> ingredients = inventoryItems.stream()
				.map( inventoryItem -> inventoryItem.getProduct().getSubCategory() )
				.filter( s -> s != null && !s.isEmpty() )
				.distinct()
				.toList();

		if ( ingredients.isEmpty() )
		{
			log.info( "No ingredients found for userCode: {} with inventoryItemIds: {}", userCode,
					requestDto.getInventoryItemIds() );
			return ResponseEntity.notFound().build();
		}

		ChefkochRecipeRequestDto recipeRequestDto = ChefkochRecipeRequestDto.builder()
				.ingredients( ingredients )
				.limit( 3 )
				.build();

		String uri = "http://localhost:5001/recipes";
		HttpResponse<ChefkochRecipeResponseDto[]> response = Unirest.post( uri )
				.header( "accept", "application/json" )
				.header( "Content-Type", "application/json" )
				.body( recipeRequestDto )
				.asObject( ChefkochRecipeResponseDto[].class );

		return ResponseEntity.ok( response.getBody() );
	}
}
