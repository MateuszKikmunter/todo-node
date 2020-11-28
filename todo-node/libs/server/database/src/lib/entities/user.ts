//libs imports
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

//local lib imports
import { Task } from './task';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, type: "varchar", unique: true })
    email: string;

    @Column({ length: 255, type: "varchar" })
    password: string;
    
    @OneToMany(type => Task, task => task.owner)
    todos: Task[];
}
