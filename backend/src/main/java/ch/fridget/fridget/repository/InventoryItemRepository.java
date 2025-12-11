package ch.fridget.fridget.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.fridget.fridget.domain.db.InventoryItem;

@Repository
public interface InventoryItemRepository extends JpaRepository<InventoryItem, UUID>
{
	List<InventoryItem> findByUserUserCode ( String userUserCode );

	Optional<InventoryItem> findFirstByUserUserCodeAndId ( String userUserCode, UUID id );

	List<InventoryItem> findAllByUserUserCodeAndIdIn ( String userUserCode, Collection<UUID> ids );

	List<InventoryItem> findByUserUserCodeAndProductIngredientNameIsNotNull ( String userUserCode );
}