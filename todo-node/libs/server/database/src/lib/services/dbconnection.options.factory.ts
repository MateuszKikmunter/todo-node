//libs imports
import { ConnectionOptions } from 'typeorm';

//local lib imports
import { DbType } from './../types/db.type';
import { environment } from './../../../../../../apps/backend/todo-api/src/environments/environment';


export class DbConnectionOptionsFactory {

    /**
     * Creates TypeORM connection options based on the db type we want to connect to.
     * @param dbType db type we want connect to, e.g. 'sqlite'
     * @param entities array of TypeORM entities
     */
    public static create = (dbType: DbType, entities: any[]): ConnectionOptions => {
        return DbConnectionOptionsFactory.actionDispatcher(dbType, entities);
    }

    /**
     * Creates TypeORM connection options based on the db type we want to connect to.
     * @param connectionType db type we want connect to, e.g. 'sqlite'
     * @param entities array of TypeORM entities
     */
    private static actionDispatcher = (connectionType: DbType, entities: any[]) => ({
        'sqlite': () => {
            return {
                name: connectionType,
                type: connectionType,
                entities,
                database: process.env.DB_LOCATION ?? ':memory:',
                synchronize: true,
                logging: environment.production ?? false
            }
        }
    })[connectionType]()
}