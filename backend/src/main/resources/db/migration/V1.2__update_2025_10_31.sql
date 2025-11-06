ALTER TABLE inventory_item
    RENAME COLUMN name TO product_name;

ALTER TABLE inventory_item
    ADD COLUMN brand_name TEXT NULL;

ALTER TABLE product
    ALTER COLUMN name DROP NOT NULL;

ALTER TABLE inventory_item
    ALTER COLUMN quantity TYPE TEXT USING quantity::TEXT;