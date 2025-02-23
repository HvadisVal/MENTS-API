import express, { Application, Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';
import { testConnection } from './repository/database';

import routes from './routes';
import { test } from 'node:test';

dotenvFlow.config();

// Create Express application
const app: Application = express();



export function startServer() {

    // json body parser
    app.use(express.json());

    // bind routes to the app
    app.use('/api', routes);

    // test db connection
    testConnection(); 

    const PORT: number = parseInt(process.env.PORT as string) || 4000;
    app.listen(PORT, function () {
        console.log('Server is running on port: ' + PORT);
    });
}