import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import { GenreDto } from "./GenreDto";
import { BookGenre } from "@/entities/BookGenre";

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
    
    @Expose({ name: 'bookGenres' })
    @Type(() => GenreDto)
    @Transform(({ obj }) => 
        obj.bookGenres.map((bookGenre: BookGenre) => plainToInstance(GenreDto, bookGenre.genre))
      )
    genres: GenreDto[];

}