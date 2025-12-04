-- set column quantity to nullable
ALTER TABLE shopping_list_item
    ALTER COLUMN quantity DROP NOT NULL;