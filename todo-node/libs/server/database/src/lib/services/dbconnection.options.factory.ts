//libs imports
import { ConnectionOptions } from 'typeorm';

//local lib imports
import { DbConnectionType } from '../configuration/dbconnection.type';

export class DbConnectionOptionsFactory {

    /**
     * Creates TypeORM connection options based on the db type we want to connect to.
     * @param dbType db type we want connect to, e.g. 'sqlite'
     * @param entities array of TypeORM entities
     */
    public static create = (dbType: string, entities: any[]): ConnectionOptions => {
        return DbConnectionOptionsFactory.actionDispatcher(dbType, entities);
    }

    /**
     * Creates TypeORM connection options based on the db type we want to connect to.
     * @param connectionType db type we want connect to, e.g. 'sqlite'
     * @param entities array of TypeORM entities
     */
    private static actionDispatcher = (connectionType: string, entities: any[]) => ({
        'sqlite': () => {
            return {
                type: DbConnectionType.SQLITE,
                entities,
                database: ':memory:',
                synchronize: true,
                logging: true
            }
        }
    })[connectionType]()
}