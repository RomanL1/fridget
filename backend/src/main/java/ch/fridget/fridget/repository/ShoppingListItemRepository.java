package ch.fridget.fridget.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.fridget.fridget.domain.db.ShoppingListItem;

@Repository
public interface ShoppingListItemRepository extends JpaRepository<ShoppingListItem, UUID>
{
	List<ShoppingListItem> findAllByUserUserCode ( String userUserCode );

	Optional<ShoppingListItem> findByUserUserCodeAndId ( String userUserCode, UUID id );
}
