package ch.fridget.fridget.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import ch.fridget.fridget.domain.dto.ProductInfoTask;
import ch.fridget.fridget.domain.ollama.ProductCategoryInfo;
import io.github.ollama4j.Ollama;
import io.github.ollama4j.exceptions.OllamaException;
import io.github.ollama4j.models.generate.OllamaGenerateRequest;
import io.github.ollama4j.models.response.OllamaResult;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OllamaService
{
	@Value("${ollama.host}")
	private String ollamaHost;

	@Value("${ollama.model}")
	private String model;

	private static final String string_name = String.class.getSimpleName().toLowerCase();
	private Ollama ollama;

	@EventListener( ApplicationReadyEvent.class )
	public void onStartup ()
	{
		this.ollama = new Ollama( ollamaHost );
		this.ollama.setRequestTimeoutSeconds( 120 );
	}

	public ProductCategoryInfo generateProductInfo ( ProductInfoTask task ) throws OllamaException
	{
		pingServer();

		ollama.pullModel( model );

		OllamaGenerateRequest request = OllamaGenerateRequest.builder()
				.withModel( model )
				.withPrompt( getPrompt( task ))
				.withFormat( getCategoryFormat() )
				.build();

		OllamaResult ollamaResult = ollama.generate( request, null );
		return ollamaResult.as( ProductCategoryInfo.class );
	}

	private boolean pingServer () throws OllamaException
	{
		return ollama.ping();
	}

	private Map<String, Object> getCategoryFormat ()
	{
		Map<String, Object> format = new HashMap<>();
		format.put( "type", "object" );
		format.put( "properties", Map.of(
				"category", Map.of( "type", string_name ),
				"subCategory", Map.of( "type", string_name )
		) );
		return format;
	}

	private String getPrompt ( ProductInfoTask task )
	{
		return "You are a food classification assistant.\n"
				+ "\n"
				+ "### Goal\n"
				+ "Given a brand name and product name, classify it into:\n"
				+ "- \"category\" → a broad, high-level group (examples: fruit, vegetable, meat, seafood, dairy, plant-based milk, grain, oil, sauce, condiment, beverage, snack, sweet, spice, canned good)\n"
				+ "- \"productType\" → the generic item used in cooking (e.g., milk, oil, tomato, rice, flour, sugar, yogurt, cheese)\n"
				+ "\n"
				+ "### Rules\n"
				+ "1. Respond with JSON.\n"
				+ "2. Always prefer the **broader culinary class**, not the brand or variety.  \n"
				+ "   - \"almond milk\" → category: \"plant-based milk\", productType: \"milk\"\n"
				+ "   - \"banana chips\" → category: \"snack\", productType: \"fruit\"\n"
				+ "   - \"olive oil extra virgin\" → category: \"oil\", productType: \"oil\"\n"
				+ "   - \"coconut milk\" → category: \"plant-based milk\", productType: \"milk\"\n"
				+ "   - \"greek yogurt\" → category: \"dairy\", productType: \"yogurt\"\n"
				+ "   - \"basmati rice\" → category: \"grain\", productType: \"rice\"\n"
				+ "3. Ignore brand names, sizes, certifications, or adjectives (\"bio\", \"fairtrade\", \"1 kg\", etc.).\n"
				+ "4. Use German terms only.\n"
				+ "5. If unclear, use null for both fields.\n"
				+ "6. Keep results consistent — similar products should map to the same broader type.\n"
				+ "\n"
				+ "### Input\n"
				+ "brandname: \"" + task.brandName() + "\"\n"
				+ "productname: \"" + task.productName() + "\"\n";
	}
}
