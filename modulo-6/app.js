// Importamos dependencias
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
require('dotenv').config();

// Crear la instancia de servidor
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  async context({ req }) {
    if (!req) {
      return;
    }

    let authorization = req.headers.authorization;

    if (authorization) {
      authorization = authorization.split(' ');
      if (authorization[0] === 'Bearer') {
        const token = authorization[authorization.length - 1];
        try {
          const payload = jwt.verify(token, process.env.JWT_KEY);
          const user = await UserModel.findById(payload._id);
          return { user: user, isAuthenticated: true, reason: null };
        } catch (err) {
          if (err.message === 'jwt expired') {
            return {
              user: null,
              isAuthenticated: false,
              reason: 'Your token has expired',
            };
          } else {
            return {
              user: null,
              isAuthenticated: false,
              reason: 'Invalid token',
            };
          }
        }
      } else {
        return {
          user: null,
          isAuthenticated: false,
          reason: 'Malformed token',
        };
      }
    } else {
      return {
        user: null,
        isAuthenticated: false,
        reason: 'token was not provided',
      };
    }
  },
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
