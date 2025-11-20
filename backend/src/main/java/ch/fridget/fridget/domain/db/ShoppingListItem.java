package ch.fridget.fridget.domain.db;

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
@Table( name = "shopping_list_item" )
public class ShoppingListItem implements UniqueIdentifiable
{
	@Id
	@Column( name = "id", nullable = false, updatable = false )
	private UUID id;

	@ManyToOne( fetch = FetchType.LAZY, optional = false )
	@JoinColumn( name = "user_id", nullable = false )
	private User user;

	@ManyToOne( fetch = FetchType.LAZY )
	@JoinColumn( name = "product_id" )
	private Product product;

	@Column( name = "product_name" )
	private String productName;

	@Column( name = "quantity", nullable = false )
	private String quantity;

	@Column( name = "brand_name" )
	private String brandName;

	@Column( name = "bought", nullable = false )
	private Boolean bought;
}
