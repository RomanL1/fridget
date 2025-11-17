package ch.fridget.fridget.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ch.fridget.fridget.domain.db.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>
{
	Optional<Product> findProductByEan13 ( String ean13 );

	@Query("select p from Product p where"
			+ " lower(p.brandName) like LOWER('%' || ?1 || '%')"
			+ "OR lower(p.name) like LOWER('%' || ?1 || '%')"
			+ "OR lower(p.ingredientName) like LOWER('%' || ?1 || '%')")
	List<Product> searchProductsBySearchTerm ( String searchTerm );
}
