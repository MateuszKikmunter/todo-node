import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './user';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    details: string;

    @Column({ type: "int" })
    completed: boolean;

    @Column({ type: "datetime" })
    deadline: string;

    @Column({ type: "datetime" })
    lastModified: string;

    @ManyToOne(type => User, owner => owner.todos)
    owner: User;
}
