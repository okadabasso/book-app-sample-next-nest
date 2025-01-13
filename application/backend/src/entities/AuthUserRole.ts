import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Book } from './Book';
import { Genre } from './Genre';
import { AuthUser } from './AuthUser';
import { AuthRole } from './AuthRole';

@Entity()
export class AuthUserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AuthUser, user => user.userRoles)
    @JoinColumn({ name: 'userId' })
    user: AuthUser;

    @ManyToOne(() => AuthRole, role => role.userRoles)
    @JoinColumn({ name: 'roleId' })
    role: AuthRole;
}