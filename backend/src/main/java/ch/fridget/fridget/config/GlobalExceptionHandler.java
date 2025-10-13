package ch.fridget.fridget.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import ch.fridget.fridget.domain.dto.ErrorMessageDto;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler
{
	@ExceptionHandler( Exception.class )
	public ResponseEntity<ErrorMessageDto> handleException ( Exception ex )
	{
		log.error( "Unhandled exception", ex );
		return new ResponseEntity<>( ErrorMessageDto.of( ex.getMessage() ), HttpStatus.INTERNAL_SERVER_ERROR );
	}
}
