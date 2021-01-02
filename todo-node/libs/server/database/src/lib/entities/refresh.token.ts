//libs imports
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

//this could be saved in redis but for this project it's enough to store it in the SQLite db together with other entites
@Entity()
export class RefreshToken {

    @PrimaryGeneratedColumn('uuid') 
    id: string

    @Column({ length: 255, type: 'uuid' })
    @Index()
    userId: string;

    //TODO: add device print in the future

    @Column({ type: 'datetime', default: new Date().toUTCString() })
    creationDate: string;
}
