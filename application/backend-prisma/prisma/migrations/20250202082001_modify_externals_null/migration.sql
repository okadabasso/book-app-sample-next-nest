-- AlterTable
ALTER TABLE "AuthUser" ALTER COLUMN "externalAuthProvider" DROP NOT NULL,
ALTER COLUMN "externalAuthId" DROP NOT NULL;
