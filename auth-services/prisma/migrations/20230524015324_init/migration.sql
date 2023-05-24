-- AlterTable
ALTER TABLE "User" ALTER COLUMN "forgotPasswordAccessToken" DROP NOT NULL,
ALTER COLUMN "forgotPasswordExpireIn" DROP NOT NULL;
