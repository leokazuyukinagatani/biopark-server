/*
  Warnings:

  - You are about to drop the column `number` on the `Apartment` table. All the data in the column will be lost.
  - You are about to alter the column `size` on the `Apartment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `apartmentNumber` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "number",
ADD COLUMN     "apartmentNumber" INTEGER NOT NULL,
ALTER COLUMN "size" SET DATA TYPE INTEGER;
