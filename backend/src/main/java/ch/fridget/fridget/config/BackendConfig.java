package ch.fridget.fridget.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class BackendConfig implements WebMvcConfigurer
{

	@Bean
	public SecurityFilterChain securityFilterChain ( HttpSecurity http ) throws Exception
	{
		http
				.csrf( AbstractHttpConfigurer::disable )
				.cors( AbstractHttpConfigurer::disable )
				.authorizeHttpRequests( requests -> requests
						.anyRequest().permitAll()
				)
				.sessionManagement( ( session ) -> session
						.sessionCreationPolicy( SessionCreationPolicy.STATELESS )
				);
		return http.build();
	}

	@Override
	public void addCorsMappings ( CorsRegistry registry )
	{
		registry.addMapping( "/api/**" )
				.allowedOrigins( "http://localhost:1420" )
				.allowedMethods( "GET", "POST", "PUT", "DELETE", "OPTIONS" );
	}
}