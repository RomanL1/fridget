package ch.fridget.fridget.domain.db;

import java.time.Instant;
import java.util.UUID;

import ch.fridget.fridget.domain.UniqueIdentifiable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table( name = "inventory_item" )
public class InventoryItem implements UniqueIdentifiable
{
	@Id
	@Column( name = "id", nullable = false, updatable = false )
	private UUID id;

	@ManyToOne( fetch = FetchType.LAZY, optional = false )
	@JoinColumn( name = "product_id", nullable = false )
	private Product product;

	@ManyToOne( fetch = FetchType.LAZY, optional = false )
	@JoinColumn( name = "user_id", nullable = false )
	private User user;

	@Column( name = "product_name" )
	private String productName;

	@Column( name = "brand_name" )
	private String brandName;

	@Column( name = "quantity" )
	private String quantity;

	@Column( name = "date_added_at", nullable = false )
	@Builder.Default
	private Instant dateAddedAt = Instant.now();

	@Column( name = "date_consumed_at" )
	private Instant dateConsumedAt;

	@Column( name = "best_before_date" )
	private Instant bestBeforeDate;

	@Column( name = "is_stored_in_fridge", nullable = false )
	private boolean storedInFridge;

	@Column( name = "is_opened", nullable = false )
	private boolean opened;
}
