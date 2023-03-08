/*
  Warnings:

  - The `status` column on the `Proposition` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StatusProposition" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Proposition" DROP COLUMN "status",
ADD COLUMN     "status" "StatusProposition" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "StatusPropositon";
