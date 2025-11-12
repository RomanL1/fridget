package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorMessageDto
{
	private String message;

	public static ErrorMessageDto of ( String message )
	{
		return ErrorMessageDto.builder().message( message ).build();
	}
}
