package ch.fridget.fridget.service;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

import ch.fridget.fridget.domain.dto.api.ChefkochRecipeResponseDto;

@Service
public class TrendingRecipeCacheService
{
	private final Cache<String, ChefkochRecipeResponseDto[]> trendingRecipeCache;

	private static final String CACHE_KEY = "trendingRecipes";

	public TrendingRecipeCacheService ()
	{
		this.trendingRecipeCache = Caffeine.newBuilder()
				.maximumSize( 1 )
				.expireAfterWrite( 60, TimeUnit.MINUTES )
				.build();
	}

	public Optional<ChefkochRecipeResponseDto[]> getTrendingRecipes ()
	{
		return Optional.ofNullable( trendingRecipeCache.getIfPresent( CACHE_KEY ) );
	}

	public void putTrendingRecipes ( ChefkochRecipeResponseDto[] recipes )
	{
		trendingRecipeCache.put( CACHE_KEY, recipes );
	}
}
