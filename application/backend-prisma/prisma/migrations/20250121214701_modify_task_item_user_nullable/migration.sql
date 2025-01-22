-- DropForeignKey
ALTER TABLE "TaskItem" DROP CONSTRAINT "TaskItem_userId_fkey";

-- AlterTable
ALTER TABLE "TaskItem" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskItem" ADD CONSTRAINT "TaskItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
