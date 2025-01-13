import { AuthUser } from "@/entities/AuthUser";
import { AuthUserRole } from "@/entities/AuthUserRole";

export class UserDto {
    id: string;
    name: string;
    email: string;
    image?: string;
    roles: string[];

    static from(user: AuthUser): UserDto {
        const userDto = new UserDto();
        userDto.id = user.userId.toString();
        userDto.name = user.userName;
        userDto.email = user.email;
        userDto.image = '';
        userDto.roles = user.userRoles.map((userRole: AuthUserRole) => userRole.role.roleName);
        return userDto;
    }
}
