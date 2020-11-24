//libs imports
import { Connection, createConnection } from 'typeorm';

//local lib imports
import { Task } from './../entities/task';
import { User } from './../entities/user';

import { DbConnectionType } from '../configuration/dbconnection.type';
import { DbConnectionOptionsFactory } from './dbconnection.options.factory';

export class SqlConnectionFactory {

    /**
     * Creates TypeORM connection based on the db type we want to connect to.
     * @param connectionType db type we want connect to, e.g. 'sqlite'
     */
    public static async createConnection(connectionType: string): Promise<Connection> {
        try {
            for (let prop in DbConnectionType) {
                //make it case insensitive with call to toLowerCase()
                const lowerCaseProp = prop.toLowerCase();
                if(lowerCaseProp === connectionType.toLowerCase()) {
                    return await createConnection(DbConnectionOptionsFactory.create(lowerCaseProp, [User, Task]));
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error(`Cannot create connection for provided database type: ${ connectionType }.`);
        }
    }
} 