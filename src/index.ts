import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import bodyParser from 'body-parser'
import cors from "cors";

import { createConnection } from "typeorm";
import { PORT, NODE_ENV, DB_NAME_LOCAL, DB_PASSWORD, DB_USERNAME, DB_PRODUCTION_URL } from '../config'
import { Setting } from './entity/Setting'

createConnection({
  type: "postgres",
  host: NODE_ENV === 'production' ? DB_PRODUCTION_URL : 'localhost',
  port: 5432,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME_LOCAL,
  entities: [
    Setting,
  ],
  synchronize: true,
  logging: false
}).then(async connection => {
  console.log(`connection ---->`)
  connection.runMigrations()
}).catch(error => console.log(error));


const app = express();


// add apollo server.
// add body parser.


app.get('/', (req, res) => res.send('yay!'));
app.listen(PORT, () => {
  console.log(`⚡️Server is running at https://localhost:${PORT}`);
});