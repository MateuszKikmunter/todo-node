//libs imports
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

//local lib imports
import { User } from './user';

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid') 
    id: string;

    @Column({ length: 255, type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    additionalDetails: string;

    @Column({ type: 'int', default: false })
    completed: boolean;

    @Column({ type: 'date' })
    deadline: Date;

    @Column({ type: 'datetime', default: new Date().toUTCString() })
    lastModified: Date;

    @ManyToOne(() => User, user => user.todos, { onDelete: 'CASCADE' })
    user: User;
}