SELECT
    "Book"."id" AS "Book_id",
    "Book"."title" AS "Book_title",
    "Book"."author" AS "Book_author",
    "Book"."description" AS "Book_description",
    "Book"."publishedYear" AS "Book_publishedYear",
    "Book"."genre" AS "Book_genre",
    "Book__Book_bookAuthors"."id" AS "Book__Book_bookAuthors_id",
    "Book__Book_bookAuthors"."bookId" AS "Book__Book_bookAuthors_bookId",
    "Book__Book_bookAuthors"."authorId" AS "Book__Book_bookAuthors_authorId",
    "Book__Book_bookAuthors__Book__Book_bookAuthors_author"."id" AS "Book__Book_bookAuthors__Book__Book_bookAuthors_author_id",
    "Book__Book_bookAuthors__Book__Book_bookAuthors_author"."name" AS "Book__Book_bookAuthors__Book__Book_bookAuthors_author_name",
    "Book__Book_bookAuthors__Book__Book_bookAuthors_author"."birthdate" AS "Book__Book_bookAuthors__Book__Book_bookAuthors_author_birthdate",
    "Book__Book_bookGenres"."id" AS "Book__Book_bookGenres_id",
    "Book__Book_bookGenres"."bookId" AS "Book__Book_bookGenres_bookId",
    "Book__Book_bookGenres"."genreId" AS "Book__Book_bookGenres_genreId",
    "Book__Book_bookGenres__Book__Book_bookGenres_genre"."id" AS "Book__Book_bookGenres__Book__Book_bookGenres_genre_id",
    "Book__Book_bookGenres__Book__Book_bookGenres_genre"."name" AS "Book__Book_bookGenres__Book__Book_bookGenres_genre_name",
    "Book__Book_bookGenres__Book__Book_bookGenres_genre"."bookGenresId" AS "Book__Book_bookGenres__Book__Book_bookGenres_genre_bookGenresId"
FROM
    "books" "Book"
    LEFT JOIN "book_author" "Book__Book_bookAuthors" ON "Book__Book_bookAuthors"."bookId" = "Book"."id"
    LEFT JOIN "author" "Book__Book_bookAuthors__Book__Book_bookAuthors_author" ON "Book__Book_bookAuthors__Book__Book_bookAuthors_author"."id" = "Book__Book_bookAuthors"."authorId"
    LEFT JOIN "book_genre" "Book__Book_bookGenres" ON "Book__Book_bookGenres"."genreId" = "Book"."id"
    LEFT JOIN "genre" "Book__Book_bookGenres__Book__Book_bookGenres_genre" ON "Book__Book_bookGenres__Book__Book_bookGenres_genre"."id" = "Book__Book_bookGenres"."genreId"