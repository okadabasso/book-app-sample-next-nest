import { Expose } from "class-transformer";
import exp from "constants";

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