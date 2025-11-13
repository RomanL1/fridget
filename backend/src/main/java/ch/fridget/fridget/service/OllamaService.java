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

	@Value("${ollama.request.timeout.seconds}")
	private int requestTimeoutSeconds;

	private static final String string_name = String.class.getSimpleName().toLowerCase();
	private Ollama ollama;

	@EventListener( ApplicationReadyEvent.class )
	public void onStartup ()
	{
		this.ollama = new Ollama( ollamaHost );
		this.ollama.setRequestTimeoutSeconds( requestTimeoutSeconds );
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
		return "<titel>\n"
				+ "Du bist ein Assistent zur Lebensmittelklassifizierung für Rezepte.\n"
				+ "</titel>\n"
				+ "<ziel>\n"
				+ "Du bekommst einen Markennamen und einem Produktnamen. Du solltest dann damit ungefähr folgendes machen.\n"
				+ "Du sollst anhand der Daten eine gängiger Name als Zutat für ein Rezept zurückgeben.\n"
				+ "</ziel>\n"
				+ "<regeln>\n"
				+ "Verwende ausschliesslich deutsche Begriffe.\n"
				+ "Wenn unklar, setze das Feld auf null.\n"
				+ "Ignoriere Markennamen, Grössenangaben, Zertifikate oder Adjektive ('Bio', 'Fairtrade', '1 kg' usw.).\n"
				+ "</regeln>\n"
				+ "<beispiele>\n"
				+ "Alpro Mandeldrink -> Milch\n"
				+ "Max Havelaar Bananen -> Banane\n"
				+ "Monini Classico Olivenöl extra vergine -> Olivenöl\n"
				+ "Thai Kitchen Kokosnussmilch -> Kokosnussmilch\n"
				+ "Yogos Rahmjoghurt griechische Art Classic -> Joghurt\n"
				+ "M-Classic Basmati Basmati-Reis -> Basmati-Reis\n"
				+ "Ovomaltine Crunchy Biscuit -> Schokoladenkeks\n"
				+ "Migros Bio Zucchetti -> Zucchetti\n"
				+ "Migros Fresca Kartoffeln festkochend -> Kartoffeln festkochend\n"
				+ "Hirz Hüttenkäse Nature -> Hüttenkäse\n"
				+ "Grana Padano Reibkäse -> Reibkäse\n"
				+ "Emmi Luzerner Rahmkäse mild -> Käse\n"
				+ "Naturafarm Eier aus Freilandhaltung 53g+ 10 Stück -> Eier\n"
				+ "Speckwürfeli ca. 200g -> Speck\n"
				+ "Cervelas 2 Stück -> Cervelas\n"
				+ "Barilla Pesto alla Genovese -> Pesto\n"
				+ "evian Mineralwasser ohne Kohlensäure 6x1,5l -> Wasser\n"
				+ "Free From Milch Drink 1,5% Milchfett UHT lactosefrei -> Milch laktosefrei\n"
				+ "Vollrahm UHT IP-Suisse -> Vollrahm\n"
				+ "Naturaplan Bio Orangen blond ca. 1kg -> Orange\n"
				+ "Clementinen ca. 500g -> Clementinen\n"
				+ "Bio Tessinerbrot -> Brot\n"
				+ "Naturaplan Bio Pagnolbrot hell -> Brot\n"
				+ "Naturaplan Bio Lachsfilet 2 Filets -> Lachs\n"
				+ "</beispiele>\n"
				+ "<eingabe>\n"
				+ "Markenname: " + task.brandName() + "\n"
				+ "Produktname: " + task.productName() + "\n"
				+ "</eingabe>\n"
				+ "<ausgabe>\n"
				+ "als JSON\n"
				+ "ingredientName: String oder null\n"
				+ "</ausgabe>";
	}
}
