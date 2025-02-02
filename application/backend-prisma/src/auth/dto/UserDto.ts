import { AuthRole, AuthUserRole } from "@prisma/client";
import { Expose, plainToInstance, Transform } from "class-transformer";

export class UserDto {
    @Expose({ name: "userId" })
    id: number;
    @Expose({ name: "userName" })
    name: string;
    @Expose()
    email: string;
    @Expose()
    image?: string;
    @Expose()
    @Transform(({ obj }) => obj.userRoles 
        ? obj.userRoles.map((userRole: AuthUserRole & { role: AuthRole }) => userRole.role.roleName) 
        : [], { toClassOnly: true })

    roles: string[];

    constructor(id: number, name: string, email: string, roles: string[]) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = roles;
    }
}
