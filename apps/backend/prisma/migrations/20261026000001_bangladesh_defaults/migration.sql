-- GoCard: new restaurants and branches start as Bangladesh (taka, Dhaka
-- time, VAT added on top of menu prices). Existing rows keep their values.
ALTER TABLE "branches" ALTER COLUMN "country" SET DEFAULT 'BD',
ALTER COLUMN "taxRegime" SET DEFAULT 'BD_VAT',
ALTER COLUMN "taxMode" SET DEFAULT 'EXCLUSIVE';

ALTER TABLE "restaurants" ALTER COLUMN "currency" SET DEFAULT 'BDT',
ALTER COLUMN "timezone" SET DEFAULT 'Asia/Dhaka';
