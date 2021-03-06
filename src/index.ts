import "reflect-metadata";
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { settingsResolvers, settingsType } from './schema/settings-type'
import { createConnection } from "typeorm";
import { PORT, NODE_ENV, DB_NAME_LOCAL, DB_PASSWORD, DB_USERNAME, DB_PRODUCTION_URL, DATABASE_URL } from '../config'
import { Setting } from './entity/Setting'

if (!NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const isDev = process.env.NODE_ENV === 'development'

createConnection({
  type: "postgres",
  port: 5432,
  url: isDev ? undefined : DATABASE_URL,
  host: isDev ? 'localhost' : undefined,
  database: isDev ? DB_NAME_LOCAL : undefined,
  ssl: !isDev ? {
    rejectUnauthorized: false,
  } : undefined,
  entities: [
    Setting,
  ],
  synchronize: true,
  logging: false
})
  .then(async connection => {
    console.log(`connected to postgres!`)
  }).catch(error => console.log(error));

const schema = makeExecutableSchema({
  typeDefs: [settingsType],
  resolvers: [settingsResolvers],
})

const server = new ApolloServer({
  schema,
  context: ({ req }) => req,
  introspection: true,
  playground: true,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});