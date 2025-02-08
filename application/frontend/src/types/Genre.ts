import { Expose } from "class-transformer";

export class Genre {
    @Expose()
    id: number;
    @Expose()
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}