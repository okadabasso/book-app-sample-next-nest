export class AuthorDto {
    id: number;
    name: string;
    birthDate: Date | null;

    constructor(id: number, name: string, birthDate: Date | null) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
    }
}