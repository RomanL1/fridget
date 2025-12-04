-- Update shopping_list_item table structure

ALTER TABLE shopping_list_item
    ADD COLUMN if not exists updated_at TIMESTAMPTZ NOT NULL DEFAULT now();