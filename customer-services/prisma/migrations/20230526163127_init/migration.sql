/*
  Warnings:

  - The values [FOOD,FASHION,ELECTRONIC,HEALTH,BEAUTY,HOME,SPORT,TRAVEL,ENTERTAINMENT,EDUCATION,FINANCE,AUTOMOTIVE,OTHER] on the enum `MerchantCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MerchantCategory_new" AS ENUM ('GENERAL', 'SMARTPHONE', 'LAPTOP', 'ACCESSORIES');
ALTER TABLE "Profile" ALTER COLUMN "category" TYPE "MerchantCategory_new" USING ("category"::text::"MerchantCategory_new");
ALTER TYPE "MerchantCategory" RENAME TO "MerchantCategory_old";
ALTER TYPE "MerchantCategory_new" RENAME TO "MerchantCategory";
DROP TYPE "MerchantCategory_old";
COMMIT;
