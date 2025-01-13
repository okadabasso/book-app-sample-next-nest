export class UserDto {
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;

    static from(user: any): UserDto {
        const userDto = new UserDto();
        userDto.id = user.id;
        userDto.name = user.name;
        userDto.email = user.email;
        userDto.image = user.image;
        userDto.role = user.role;
        return userDto;
    }
}
