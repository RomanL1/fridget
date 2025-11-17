ALTER TABLE product
    RENAME COLUMN category TO ingredient_name;

ALTER TABLE product
    DROP COLUMN IF EXISTS sub_category;

