import { TaskRoute } from './app/routes/task.route';
import { UserRoute } from './app/routes/user.route';
import { SqlConnectionFactory } from '@todo-node/server/database';
import { Connection } from 'typeorm';
import { App } from './app/app';

SqlConnectionFactory.createConnection("sqlite").then((connection: Connection) => {

    const app = new App({
        port: process.env.PORT ?? 4000,
        routes: [
            new UserRoute(),
            new TaskRoute()
        ]
    });

    app.start();
    app.healthCheck();
    app.on('close', connection.close);
});
