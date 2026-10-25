-- GoCard: Bangladesh mobile financial services and VAT regime. Kept apart
-- from the column defaults below because Postgres cannot use a new enum
-- value in the same transaction that adds it.
ALTER TYPE "PaymentMethod" ADD VALUE 'BKASH';
ALTER TYPE "PaymentMethod" ADD VALUE 'NAGAD';
ALTER TYPE "PaymentMethod" ADD VALUE 'ROCKET';

ALTER TYPE "TaxRegime" ADD VALUE 'BD_VAT';
