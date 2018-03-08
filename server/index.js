import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import { User, Member, Team, Channel, Messages } from './models';

dotenv.config();

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'))
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const PORT = 8080;

const app = express();
app.use(cors('*'));

// create a .env file to pass your db path as MONGO_URL or pass it manually to
// MongoClient.connect()
MongoClient.connect(process.env.MONGO_URL, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MongoDB connected...');
  }
});
// mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);

// bodyParser is needed just for POST.
// graphql boilerplate setup
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, context: { User, Member, Team, Channel, Messages } })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
