import { Connection } from 'typeorm';
import * as express from 'express';

import { SqlConnectionFactory, User } from '@todo-node/server/database';

//TODO: TEMPORARY DB CONNECTION TEST => TO REMOVE LATER
SqlConnectionFactory.createConnection('sqlite').then((connection: Connection) => {

    const app = express();
    const repo = connection.getRepository(User);

    app.get('/api', async (req, res) => {
        try {
            const users = await repo.find();
    
            res.json(users ?? { message: 'No data found!' });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    });

    const port = process.env.port || 4000;
    const server = app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
    server.on('close', connection.close);
}).catch(error => console.log(error));

const start = async () => {
    const dbConnection = await SqlConnectionFactory.createConnection('sqlite');
    dbConnection;
};