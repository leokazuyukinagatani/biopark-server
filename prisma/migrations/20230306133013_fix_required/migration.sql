-- AlterTable
ALTER TABLE "apartments" ALTER COLUMN "apartmentNumber" DROP NOT NULL,
ALTER COLUMN "bedrooms" DROP NOT NULL,
ALTER COLUMN "bathrooms" DROP NOT NULL,
ALTER COLUMN "parkingSpaces" DROP NOT NULL,
ALTER COLUMN "furnished" DROP NOT NULL,
ALTER COLUMN "petsAllowed" DROP NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "rentValue" DROP NOT NULL;
