import { Expose } from "class-transformer";

export class ProfileDto {
    @Expose()
    originalUserName: string;
    @Expose()
    userName: string;
    @Expose()
    email: string;

}