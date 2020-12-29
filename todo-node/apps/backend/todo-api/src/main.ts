//libs imports
import { Connection } from 'typeorm';
import { SqlConnectionFactory } from '@todo-node/server/database';
import * as bodyParser from "body-parser";

//local imports
import { App } from './app/app';
import { TaskRoute } from './app/routes/task.route';
import { UserRoute } from './app/routes/user.route';
import { AuthRoute } from './app/routes/auth.route';


SqlConnectionFactory.createConnection('sqlite').then((connection: Connection) => {

    const app = new App({
        port: process.env.PORT ?? 4000,
        routes: [
            new UserRoute(),
            new TaskRoute(),
            new AuthRoute()
        ],
        middleware: [
            bodyParser.json(),
            bodyParser.urlencoded({ extended: true })
        ]
    });

    app.start();
    app.healthCheck();
    app.on('close', connection.close);
});
