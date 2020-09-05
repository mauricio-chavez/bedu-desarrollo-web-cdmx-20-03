const bcrypt = require('bcrypt');
const UserModel = require('./models/User'); // importamos el modelo de usuario
const MovieModel = require('./models/Movie');

// Resolvers: ¿Cómo lo vamos a hacer?
const resolvers = {
  Query: {
    async movies() {
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
    async createMovie(parent, args) {
      const { name, director, year } = args;
      const movie = await MovieModel.create({ name, director, year });
      return movie;
    },
  },
};

module.exports = resolvers;
