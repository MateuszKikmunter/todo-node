//libs imports
import { Connection, createConnection } from 'typeorm';

//local lib imports
import { Task } from './../entities/task';
import { User } from './../entities/user';

import { DbType } from './../types/db.type';
import { DbConnectionOptionsFactory } from './dbconnection.options.factory';

export class SqlConnectionFactory {

    /**
     * Creates TypeORM connection based on the db type we want to connect to.
     * @param databaseType db type we want connect to, e.g. 'sqlite'
     */
    public static async createConnection(databaseType: DbType): Promise<Connection> {
        try {
            return await createConnection(DbConnectionOptionsFactory.create(databaseType, [User, Task]));
        } catch (error) {
            console.log(error);
            throw new Error(`Can't create connection for the provided database type: ${ databaseType}`);
        }
    }
}