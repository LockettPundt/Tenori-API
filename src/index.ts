import "reflect-metadata";
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import bodyParser from 'body-parser'
import { settingsResolvers, settingsType } from './schema/settings-type'
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

const schema = makeExecutableSchema({
  typeDefs: [settingsType],
  resolvers: [settingsResolvers],
})

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: ({ req }) => req,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});