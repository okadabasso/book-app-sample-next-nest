import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialCreate1736358607485 implements MigrationInterface {
    name = 'InitialCreate1736358607485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_author" ("id" SERIAL NOT NULL, "bookId" integer, "authorId" integer, CONSTRAINT "PK_24b753b0490a992a6941451f405" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "genre" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0285d4f1655d080cfcf7d1ab141" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_genre" ("id" SERIAL NOT NULL, "bookId" integer, "genreId" integer, CONSTRAINT "PK_f316eed809f6f7617821012ad05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "description" text NOT NULL, "publishedYear" integer NOT NULL, "genre" character varying NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_56b8cdc80ea78d03dcece601fff" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_author" ADD CONSTRAINT "FK_4979ade189c87f2db1e0e9c213c" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genre" ADD CONSTRAINT "FK_d3446a42df5e6f8158a5bd10f1a" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_genre" ADD CONSTRAINT "FK_564b744154ba1b5bc35e851f8bc" FOREIGN KEY ("genreId") REFERENCES "genre"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_genre" DROP CONSTRAINT "FK_564b744154ba1b5bc35e851f8bc"`);
        await queryRunner.query(`ALTER TABLE "book_genre" DROP CONSTRAINT "FK_d3446a42df5e6f8158a5bd10f1a"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_4979ade189c87f2db1e0e9c213c"`);
        await queryRunner.query(`ALTER TABLE "book_author" DROP CONSTRAINT "FK_56b8cdc80ea78d03dcece601fff"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "book_genre"`);
        await queryRunner.query(`DROP TABLE "genre"`);
        await queryRunner.query(`DROP TABLE "book_author"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
