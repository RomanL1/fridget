package ch.fridget.fridget.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.fridget.fridget.domain.db.RecipeProduct;

@Repository
public interface RecipeProductRepository extends JpaRepository<RecipeProduct, UUID>
{
}
