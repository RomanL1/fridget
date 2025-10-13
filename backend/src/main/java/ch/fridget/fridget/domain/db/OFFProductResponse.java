package ch.fridget.fridget.domain.db;

import java.time.Instant;
import java.util.UUID;

import ch.fridget.fridget.domain.UniqueIdentifiable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//off = open food facts
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode( of = "id" )
@Entity
@Table( name = "off_product_response" )
public class OFFProductResponse implements UniqueIdentifiable
{
	@Id
	@Column( name = "id", nullable = false, updatable = false )
	private UUID id;

	@Column( name = "ean13", nullable = false )
	private String ean13;

	@Column( name = "raw_response", nullable = false )
	private String rawResponse;

	@Builder.Default
	@Column( name = "created_at", nullable = false, updatable = false )
	private Instant createdAt = Instant.now();
}
