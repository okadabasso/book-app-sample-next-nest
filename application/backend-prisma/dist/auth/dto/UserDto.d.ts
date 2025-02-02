export declare class UserDto {
    id: number;
    name: string;
    email: string;
    image?: string;
    roles: string[];
    constructor(id: number, name: string, email: string, roles: string[]);
}
