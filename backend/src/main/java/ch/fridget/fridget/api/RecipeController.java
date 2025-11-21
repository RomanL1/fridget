package ch.fridget.fridget.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
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
import ch.fridget.fridget.service.TrendingRecipeCacheService;
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
	private static final int DEFAULT_RECIPE_LIMIT = 8;

	@Value( "${recipe.api.url}" )
	private String RECIPE_API_URL;

	private final InventoryItemRepository inventoryItemRepository;
	private final TrendingRecipeCacheService trendingRecipeCacheService;

	@GetMapping( PREFIX + "/trending" )
	public ResponseEntity<ChefkochRecipeResponseDto[]> getTrendingRecipes ()
	{
		Map<String, Object> body = new HashMap<>();
		body.put( "limit", DEFAULT_RECIPE_LIMIT );

		ChefkochRecipeResponseDto[] trendingRecipes = trendingRecipeCacheService.getTrendingRecipes()
				.orElseGet( () -> requestRecipeApiWithMapBody( "/daily_recipes", body ) );

		return ResponseEntity.ok( trendingRecipes );
	}

	@PostMapping( PREFIX + "/filtered" )
	public ResponseEntity<ChefkochRecipeResponseDto[]> getFilteredRecipes (
			@RequestHeader( "userCode" ) String userCode,
			@RequestBody ChefkochRecipeFilteredRequestDto requestDto )
	{
		if ( requestDto.getInventoryItemIds() == null || requestDto.getInventoryItemIds().isEmpty() )
		{
			log.error( "inventoryItemIds is null or empty in requestDto: {}", requestDto );
			return ResponseEntity.badRequest().build();
		}

		List<UUID> ids;
		try
		{
			ids = requestDto.getInventoryItemIds().stream().map( UUID::fromString ).toList();
		}
		catch ( IllegalArgumentException e )
		{
			log.warn( "Invalid UUID format in inventoryItemIds: {}", requestDto.getInventoryItemIds(), e );
			return ResponseEntity.badRequest().build();
		}

		List<InventoryItem> inventoryItems = inventoryItemRepository.findAllByUserUserCodeAndIdIn( userCode, ids );

		List<String> ingredients = inventoryItems.stream()
				.map( inventoryItem -> inventoryItem.getProduct().getIngredientName() )
				.filter( s -> s != null && !s.isEmpty() )
				.distinct()
				.toList();

		if ( ingredients.isEmpty() )
		{
			log.warn( "No ingredients found for userCode: {} with inventoryItemIds: {}", userCode,
					requestDto.getInventoryItemIds() );
			return ResponseEntity.notFound().build();
		}

		ChefkochRecipeRequestDto recipeRequestDto = ChefkochRecipeRequestDto.builder()
				.ingredients( ingredients )
				.limit( DEFAULT_RECIPE_LIMIT )
				.build();

		ChefkochRecipeResponseDto[] response = requestRecipeApiWithRequestDtoBody( "/recipes", recipeRequestDto );

		return ResponseEntity.ok( response );
	}

	private ChefkochRecipeResponseDto[] requestRecipeApiWithMapBody ( String path, Map<String, Object> body )
	{
		String uri = RECIPE_API_URL + path;

		HttpResponse<ChefkochRecipeResponseDto[]> response = Unirest.post( uri )
				.header( "accept", "application/json" )
				.header( "Content-Type", "application/json" )
				.body( body )
				.asObject( ChefkochRecipeResponseDto[].class );

		trendingRecipeCacheService.putTrendingRecipes(  response.getBody() );

		return response.getBody();
	}

	private ChefkochRecipeResponseDto[] requestRecipeApiWithRequestDtoBody ( String path,
			ChefkochRecipeRequestDto requestDto )
	{
		String uri = RECIPE_API_URL + path;

		HttpResponse<ChefkochRecipeResponseDto[]> response = Unirest.post( uri )
				.header( "accept", "application/json" )
				.header( "Content-Type", "application/json" )
				.body( requestDto )
				.asObject( ChefkochRecipeResponseDto[].class );

		return response.getBody();
	}

}
