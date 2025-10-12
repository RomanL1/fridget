package ch.fridget.fridget.config.filter;

import java.io.IOException;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Order( 2 )
@Slf4j
public class RequestResponseLogger implements Filter
{

	@Override
	public void doFilter ( ServletRequest request, ServletResponse response, FilterChain chain )
			throws IOException, ServletException
	{

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		log.info( "Logging Request  {} : {}", req.getMethod(), req.getRequestURI() );
		chain.doFilter( request, response );
		log.info( "Logging Response :{}", res.getContentType() );
	}
}
