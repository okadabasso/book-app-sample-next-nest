import { Expose } from "class-transformer";

export class Profile {
    @Expose()
    originalUserName: string;
    @Expose()
    userName: string;
    @Expose()
    email: string;

    constructor(originalUserName: string, userName: string, email: string) {
        this.originalUserName = originalUserName;
        this.userName = userName;
        this.email = email;
    }
}