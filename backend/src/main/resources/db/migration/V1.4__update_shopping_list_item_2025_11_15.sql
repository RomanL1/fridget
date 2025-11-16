-- Update shopping_list_item table:
-- Rename name to product_name
-- Add brand_name
-- Drop quantity_number and quanitity_type
-- Add bought flag

ALTER TABLE shopping_list_item
    RENAME COLUMN name TO product_name;

ALTER TABLE shopping_list_item
    ADD COLUMN brand_name TEXT NULL;

ALTER TABLE shopping_list_item
    DROP COLUMN IF EXISTS quantity_number;

ALTER TABLE shopping_list_item
    DROP COLUMN IF EXISTS quanitity_type;

ALTER TABLE shopping_list_item
    ADD COLUMN bought BOOLEAN NOT NULL DEFAULT false;
