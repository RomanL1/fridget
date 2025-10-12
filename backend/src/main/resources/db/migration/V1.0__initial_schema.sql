CREATE TABLE "inventory_item"
(
    "id"                  uuid PRIMARY KEY,
    "product_id"          uuid      NOT NULL,
    "user_id"             uuid      NOT NULL,
    "quantity"            TEXT      NOT NULL,
    "quantity_number"     integer,
    "quanitity_type"      TEXT,
    "date_added_at"       timestamp NOT NULL,
    "date_consumed_at"    timestamp,
    "best_before_date"    timestamp NOT NULL,
    "is_stored_in_fridge" boolean   NOT NULL,
    "is_opened"           boolean   NOT NULL
);

CREATE TABLE "product"
(
    "id"                            uuid PRIMARY KEY,
    "ean"                           TEXT,
    "name"                          TEXT NOT NULL,
    "type"                          TEXT NOT NULL,
    "common_best_before_time_range" int,
    "image_url"                   TEXT
);

CREATE TABLE "recipe"
(
    "id"           uuid PRIMARY KEY,
    "name"         TEXT   NOT NULL,
    "description"  TEXT   NOT NULL,
    "steps"        TEXT[] NOT NULL,
    "dish_type"    TEXT,
    "complexity"   float,
    "rating"       float,
    "image_url"  TEXT,
    "external_url" TEXT
);

CREATE TABLE "recipe_product"
(
    "id"              uuid PRIMARY KEY,
    "recipe_id"       uuid NOT NULL,
    "product_id"      uuid NOT NULL,
    "quantity"        TEXT NOT NULL,
    "quantity_number" integer,
    "quanitity_type"  TEXT
);

CREATE TABLE "shopping_list_item"
(
    "id"              uuid PRIMARY KEY,
    "user_id"         uuid NOT NULL,
    "product_id"      uuid,
    "name"            TEXT,
    "quantity"        TEXT NOT NULL,
    "quantity_number" integer,
    "quanitity_type"  TEXT
);

CREATE TABLE "user"
(
    "id"        uuid PRIMARY KEY,
    "user_code" TEXT NOT NULL
);

ALTER TABLE "inventory_item"
    ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "recipe_product"
    ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "recipe_product"
    ADD FOREIGN KEY ("product_id") REFERENCES "recipe" ("id");

ALTER TABLE "shopping_list_item"
    ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "shopping_list_item"
    ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "inventory_item"
    ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");
