/*
  Warnings:

  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - Added the required column `district` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "state",
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Indonesia',
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "village" TEXT NOT NULL,
ALTER COLUMN "detail" DROP NOT NULL;
