/*
  Warnings:

  - You are about to drop the column `publishedYear` on the `Book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishedYear",
ADD COLUMN     "publishedDate" VARCHAR(10) DEFAULT '';
