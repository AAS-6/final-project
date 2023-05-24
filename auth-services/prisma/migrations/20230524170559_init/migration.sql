/*
  Warnings:

  - You are about to drop the column `firstName` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Merchant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Merchant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'MERCHANT');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_customerId_key" ON "Merchant"("customerId");

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
