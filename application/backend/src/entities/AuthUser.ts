import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AuthUserRole } from './AuthUserRole';

@Entity()
export class AuthUser {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    userName: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    passwordHash: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    externalAuthProvider: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    externalAuthId: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @OneToMany(() => AuthUserRole, userRole => userRole.user)
    userRoles: AuthUserRole[];

}