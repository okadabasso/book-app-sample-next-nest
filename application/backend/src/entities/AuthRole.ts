import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BookGenre } from './BookGenre';
import { AuthUserRole } from './AuthUserRole';

@Entity()
export class AuthRole {
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({length: 64, nullable: false})
    roleName: string;

    @OneToMany(() => AuthUserRole, userRole => userRole.role)
    userRoles: AuthUserRole[];

    constructor (id: number, name: string) {
        this.roleId = id;
        this.roleName = name;
    }
}