const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pubsub = require('./pubsub');
const UserModel = require('./models/User'); // importamos el modelo de usuario
const MovieModel = require('./models/Movie');

// Resolvers: ¿Cómo lo vamos a hacer?
const resolvers = {
  Query: {
    async movies(parent, args, context) {
      if (!context.isAuthenticated) {
        throw new Error(context.reason);
      }
      const movies = await MovieModel.find();
      return movies;
    },
  },
  Mutation: {
    // Resolver recibe como argumento los argumentos mandados en la consulta
    async signup(parent, args) {
      // Obtengo el objeto usuario a partir de args
      const { user } = args;
      // Verificamos que no exista un usuario con el correo ingresado
      const userExists = await UserModel.findOne({ email: user.email });

      // Si el usuario existe, tiramos una excepción explicando que
      // el usuario no se guardó porque ya existe
      if (userExists) {
        throw Error(`User with email ${user.email} already exists.`);
      }

      // Si el usuario no existe, hasheamos la contraseña y la asignamos al
      // valor de contraseña en el objeto usuario
      const hash = await bcrypt.hash(user.password, 12);
      user.password = hash;

      // Creamos el usuario en Mongo a través del modelo
      const createdUser = await UserModel.create(user);

      // Regresamos el usuario creado
      return createdUser;
    },
    async createMovie(parent, args, context) {
      if (!context.isAuthenticated) {
        throw new Error(context.reason);
      }
      const { name, director, year } = args;
      const movie = await MovieModel.create({ name, director, year });
      pubsub.publish('MOVIE_ADDED', { movieAdded: movie });
      return movie;
    },
    async login(parent, args) {
      const { email, password } = args;
      const user = await UserModel.findOne({ email: email });
      if (!user) {
        throw new Error(`User with email ${email} doesn't exist`);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Incorrect credentials.');
      }

      // Borramos contraseña del objeto de Javascript
      delete user.password;

      // Emitimos token

      const payload = { _id: user._id, email: user.email };

      const token = jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '1h',
      });
      return { token: token };
    },
  },
  Subscription: {
    movieAdded: {
      subscribe: () => pubsub.asyncIterator(['MOVIE_ADDED']),
    },
  },
};

module.exports = resolvers;
