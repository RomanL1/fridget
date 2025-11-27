-- Update shopping_list_item table structure

ALTER TABLE shopping_list_item
    RENAME COLUMN brand_name TO description;

ALTER TABLE shopping_list_item
    RENAME COLUMN product_name TO name;