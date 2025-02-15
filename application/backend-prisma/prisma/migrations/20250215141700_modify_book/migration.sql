-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "isbn" VARCHAR(13) DEFAULT '',
ADD COLUMN     "publisher" VARCHAR(255) DEFAULT '',
ADD COLUMN     "thumbnail" VARCHAR(1024) DEFAULT '';
