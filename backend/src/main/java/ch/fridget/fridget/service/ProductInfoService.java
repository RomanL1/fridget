package ch.fridget.fridget.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import ch.fridget.fridget.domain.dto.ProductInfoTask;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class ProductInfoService
{
	private final AsyncProductInfoWorker asyncProductInfoWorker;

	@Value("${ollama.run.enabled}")
	private boolean runEnabled;

	public void submitProductForProcessing ( final ProductInfoTask productInfoTask )
	{
		if ( !runEnabled )
		{
			return;
		}

		if ( asyncProductInfoWorker.getRemainingSize() > 0 )
		{
			asyncProductInfoWorker.enqueue( productInfoTask );
		}
	}
}

