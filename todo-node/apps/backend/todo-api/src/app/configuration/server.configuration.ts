//local imports
import { Route } from './../interfaces/route';

export interface ServerConfiguration {
    port: string | number;
    routes?: Route[],
    middleware?: any[]
}