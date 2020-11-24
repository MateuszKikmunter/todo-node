import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Task } from './task';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, type: "varchar" })
    email: string;

    @Column({ length: 255, type: "varchar" })
    password: string;
    
    @OneToMany(type => Task, task => task.owner)
    todos: Task[];
}
