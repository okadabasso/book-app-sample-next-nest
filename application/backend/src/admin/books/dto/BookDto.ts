import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import { GenreDto } from "./GenreDto";
import { BookGenre } from "@/entities/BookGenre";
import { AuthorDto } from "./AuthorDto";
import { BookAuthor } from "@/entities/BookAuthor";

export class BookDto {

    @Expose()
    id: number;
    @Expose()
    title: string;
    @Expose()
    author: string;
    @Expose()
    publishedYear: number;
    @Expose()
    description: string;

    @Expose({ name: 'bookAuthors' })
    @Type(() => AuthorDto)
    @Transform(({ obj }) => 
        obj.bookAuthors.map((bookAuthor: BookAuthor) => plainToInstance(AuthorDto, bookAuthor.author))
      )
    authors?: AuthorDto[] = [];

    @Expose({ name: 'bookGenres' })
    @Type(() => GenreDto)
    @Transform(({ obj }) => 
        obj.bookGenres.map((bookGenre: BookGenre) => plainToInstance(GenreDto, bookGenre.genre))
      )
    genres?: GenreDto[] = [];

}