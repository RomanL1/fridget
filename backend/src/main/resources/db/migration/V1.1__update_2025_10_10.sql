--  + Product -> addedByUser
--  + Product -> category (fruits)
--  + Product -> sub_category (banana)

ALTER TABLE product
    DROP COLUMN IF EXISTS type;

ALTER TABLE inventory_item
    DROP COLUMN IF EXISTS quantity,
    DROP COLUMN IF EXISTS quanitity_type;

ALTER TABLE inventory_item
    RENAME COLUMN quantity_number TO quantity;

ALTER TABLE Product
    RENAME COLUMN ean TO ean13;

-- ignore warning from IDE regarding DEFAULT VALUE
ALTER TABLE product
    ADD COLUMN brand_name             TEXT NULL,
    ADD COLUMN manually_added_by_user BOOL NOT NULL,
    ADD COLUMN incomplete             BOOL NOT NULL,
    ADD COLUMN quantity               TEXT NOT NULL,
    ADD COLUMN category               TEXT NOT NULL,
    ADD COLUMN sub_category           TEXT NOT NULL;

-- new table raw response from off_product_response
CREATE TABLE IF NOT EXISTS off_product_response
(
    id           uuid PRIMARY KEY,
    ean13        TEXT        NOT NULL,
    raw_response TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);


ALTER TABLE inventory_item
    ADD COLUMN name TEXT DEFAULT NULL;