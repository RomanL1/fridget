package ch.fridget.fridget.domain.dto.api;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCodeResponseDto
{
	private String userCode;
}
