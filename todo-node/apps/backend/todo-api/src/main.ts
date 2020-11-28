import * as express from 'express';

const app = express();

app.get('/api', async (req, res) => {
    try {
        res.json({ message: 'Welcome to the api!' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.port || 4000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
