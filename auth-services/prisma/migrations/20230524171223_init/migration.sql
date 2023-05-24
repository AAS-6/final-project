/*
  Warnings:

  - The values [CUSTOMER,MERCHANT] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `firstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SELLER', 'BUYER');
ALTER TABLE "Customer" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Customer" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Customer" ALTER COLUMN "role" SET DEFAULT 'BUYER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ALTER COLUMN "role" SET DEFAULT 'BUYER';

-- DropTable
DROP TABLE "Merchant";
