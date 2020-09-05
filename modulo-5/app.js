// Importamos dependencias
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();

// Crear la instancia de servidor
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

// Escuchar peticiones :)
server.listen().then(async ({ url }) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🤖  Listening on ${url}`);
  } catch {
    console.log('Error while connecting to database, shutting down...');
    process.exit(1);
  }
});
