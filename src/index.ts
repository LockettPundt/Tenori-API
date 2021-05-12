import "reflect-metadata";
import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import { settingsResolvers, settingsType } from './schema/settings-type'
import { createConnection } from "typeorm";
import { PORT, NODE_ENV } from '../config'

if (!NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

createConnection()
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