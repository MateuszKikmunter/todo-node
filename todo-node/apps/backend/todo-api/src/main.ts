import { Connection } from 'typeorm';
import * as express from 'express';

import { SqlConnectionFactory, User } from '@todo-node/server/database';

//TODO: TEMPORARY DB CONNECTION TEST => TO REMOVE LATER
SqlConnectionFactory.createConnection('sqlite').then((connection: Connection) => {

    const app = express();
    const repo = connection.getRepository(User);

    app.get('/api', async (req, res) => {
      const user = await repo.findOne(1);
        res.json(user ?? { message: 'No data found!' });
    });

    const port = process.env.port || 4000;
    const server = app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
    server.on('close', connection.close);
}).catch(error => console.log(error));