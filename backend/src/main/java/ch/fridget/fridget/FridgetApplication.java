package ch.fridget.fridget;

import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class FridgetApplication implements ApplicationListener<ContextRefreshedEvent>
{

	public static void main ( String[] args )
	{
		SpringApplication.run( FridgetApplication.class, args );
	}

	@Override
	public void onApplicationEvent ( ContextRefreshedEvent event )
	{
		ApplicationContext applicationContext = event.getApplicationContext();
		RequestMappingHandlerMapping requestMappingHandlerMapping = applicationContext
				.getBean( "requestMappingHandlerMapping", RequestMappingHandlerMapping.class );
		Map<RequestMappingInfo, HandlerMethod> map = requestMappingHandlerMapping
				.getHandlerMethods();
		map.forEach( ( key, value ) -> log.info( "{} {}", key, value ) );
	}
}
