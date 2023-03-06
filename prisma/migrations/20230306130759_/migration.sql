/*
  Warnings:

  - A unique constraint covering the columns `[apartmentId]` on the table `locations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "locations_apartmentId_key" ON "locations"("apartmentId");
