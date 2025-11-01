package ch.fridget.fridget.config.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import ch.fridget.fridget.common.Util;
import ch.fridget.fridget.domain.db.User;
import ch.fridget.fridget.repository.UserRepository;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@Order( 3 ) // ensure it runs early
@RequiredArgsConstructor
public class UserCodeFilter implements Filter
{

	private final UserRepository userRepository;

	@Override
	public void doFilter ( ServletRequest request, ServletResponse response, FilterChain chain )
			throws IOException, ServletException
	{

		HttpServletRequest httpReq = (HttpServletRequest) request;
		HttpServletResponse httpRes = (HttpServletResponse) response;

		String path = httpReq.getRequestURI();
		String userCode = httpReq.getHeader( "userCode" );

		// Allow /api/register always, no matter what
		if ( path.equals( "/api/register" ) )
		{
			chain.doFilter( request, response );
			return;
		}

		// For all other paths: block if userCode is missing
		if ( Util.isEmptyString( userCode ) )
		{
			httpRes.setStatus( HttpServletResponse.SC_UNAUTHORIZED );
			httpRes.getWriter().write( "Missing userCode header" );
			return;
		}

		//Maybe not optimal for performance but has to be checked anyway
		Optional<User> userByUserCode = userRepository.findUserByUserCode( userCode );
		if ( userByUserCode.isEmpty() )
		{
			httpRes.setStatus( HttpServletResponse.SC_UNAUTHORIZED );
			httpRes.getWriter().write( "Missing userCode header" );
			return;
		}

		// If header exists, continue as normal
		chain.doFilter( request, response );
	}
}
