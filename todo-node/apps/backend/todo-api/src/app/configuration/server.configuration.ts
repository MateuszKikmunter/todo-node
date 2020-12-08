//local imports
import { Route } from '../shared/interfaces/route';


export interface ServerConfiguration {
    port: string | number;
    routes?: Route[],
    middleware?: any[]
}