/*
  Warnings:

  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPasswordAccessToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgotPasswordExpireIn` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accessTokens" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "forgotPasswordAccessToken" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "forgotPasswordExpireIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
