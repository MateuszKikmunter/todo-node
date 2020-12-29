//libs imports
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

//local lib imports
import { Task } from './task';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid') 
    id: string

    @Column({ length: 255, type: 'varchar', unique: true })
    email: string;

    @Column({ length: 255, type: 'varchar', select: false })
    password: string;

    @Column({ type: 'datetime', default: new Date().toUTCString() })
    creationDate: string;
    
    @OneToMany(type => Task, task => task.owner)
    todos: Task[];
}
