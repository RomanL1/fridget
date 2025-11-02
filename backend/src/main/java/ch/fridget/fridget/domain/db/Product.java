package ch.fridget.fridget.domain.db;

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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode( of = "id" )
@Entity
@Table( name = "product" )
public class Product implements UniqueIdentifiable
{
	@Id
	@Column( name = "id", nullable = false, updatable = false )
	private UUID id;

	@Column( name = "ean13" )
	private String ean13;

	@Column( name = "brand_name" )
	private String brandName;

	@Column( name = "name" )
	private String name;

	@Column( name = "manually_added_by_user", nullable = false )
	@Builder.Default
	private boolean manuallyAddedByUser = false;

	@Column( name = "incomplete", nullable = false )
	@Builder.Default
	private boolean incomplete = true;

	@Column( name = "quantity", nullable = false )
	@Builder.Default
	private String quantity = "UNKNOWN";

	@Column( name = "category" )
	private String category;

	@Column( name = "sub_category" )
	private String subCategory;

	@Column( name = "common_best_before_time_range" )
	private Integer commonBestBeforeTimeRange;

	@Column( name = "image_url" )
	private String imageUrl;
}
