package ch.fridget.fridget.api;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import ch.fridget.fridget.domain.db.User;
import ch.fridget.fridget.domain.dto.api.UserCodeResponseDto;
import ch.fridget.fridget.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RegisterController implements APIController
{
	private final UserRepository userRepository;

	@PostMapping( "register" )
	public ResponseEntity<UserCodeResponseDto> register ()
	{
		String newUserCode = UUID.randomUUID().toString().replaceAll("-", "");
		User user = User.builder()
				.id( UUID.randomUUID() )
				.userCode( newUserCode )
				.build();

		userRepository.save( user );

		return ResponseEntity.ok( UserCodeResponseDto.builder().userCode( newUserCode ).build() );

	}
}
