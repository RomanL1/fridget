--  + Product -> addedByUser
--  + Product -> category (fruits)
--  + Product -> sub_category (banana)

ALTER TABLE product
    DROP COLUMN IF EXISTS type;

ALTER TABLE product
    ADD COLUMN manually_added_by_user BOOL NOT NULL default FALSE,
    ADD COLUMN category               TEXT NOT NULL default 'UNCATEGORIZED',
    ADD COLUMN sub_category           TEXT NOT NULL default 'UNCATEGORIZED';

-- new table raw response from off_product_response
CREATE TABLE IF NOT EXISTS off_product_respons
(
    id           uuid PRIMARY KEY,
    ean13        TEXT        NOT NULL,
    raw_response TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE Product
    RENAME COLUMN ean TO ean13;