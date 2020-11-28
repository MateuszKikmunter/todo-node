export interface ServerConfiguration {
    port: string | number;
    routes?: any[],
    middleware?: any[]
}