//libs imports
import { Connection } from 'typeorm';
import { SqlConnectionFactory } from '@todo-node/server/database';

//local imports
import { App } from './app/app';
import { TaskRoute } from './app/routes/task.route';
import { AuthRoute } from './app/routes/auth.route';
import { json, urlencoded } from 'express';


SqlConnectionFactory.createConnection('sqlite').then((connection: Connection) => {

    const app = new App({
        port: process.env.PORT ?? 4000,
        routes: [
            new TaskRoute(),
            new AuthRoute()
        ],
        middleware: [
            json(),
            urlencoded({ extended: true })
        ]
    });

    app.start();
    app.healthCheck();
    app.on('close', connection.close);
});
