import { Expose } from "class-transformer";

export class GenreDto {
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    isNew: boolean = false;
}