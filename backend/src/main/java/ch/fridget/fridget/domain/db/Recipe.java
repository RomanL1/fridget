package ch.fridget.fridget.domain.db;

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
import lombok.Builder.Default;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "recipe")
public class Recipe implements UniqueIdentifiable
{
	@Id
	@Column(name = "id", nullable = false, updatable = false)
	private UUID id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description", nullable = false)
	private String description;

	@JdbcTypeCode(SqlTypes.ARRAY)
	@Column(name = "steps", nullable = false, columnDefinition = "TEXT[]")
	@Default
	private List<String> steps = new ArrayList<>();

	@Column(name = "dish_type")
	private String dishType;

	@Column(name = "complexity")
	private Double complexity;

	@Column(name = "rating")
	private Double rating;

	@Column(name = "picture_url")
	private String pictureUrl;

	@Column(name = "external_url")
	private String externalUrl;
}
