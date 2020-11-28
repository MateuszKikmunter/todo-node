//libs imports
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

//local lib imports
import { User } from './user';

@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid') 
    id: string

    @Column({ length: 255, type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    additionalDetails: string;

    @Column({ type: 'int', default: false })
    completed: boolean;

    @Column({ type: 'datetime' })
    deadline: string;

    @Column({ type: 'datetime', default: new Date().toUTCString() })
    lastModified: string;

    @ManyToOne(type => User, owner => owner.todos)
    owner: User;
}
