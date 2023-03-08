-- CreateEnum
CREATE TYPE "StatusPropositon" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Proposition" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "rentalValue" INTEGER NOT NULL,
    "status" "StatusPropositon" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Proposition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Proposition_apartmentId_key" ON "Proposition"("apartmentId");

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposition" ADD CONSTRAINT "Proposition_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
