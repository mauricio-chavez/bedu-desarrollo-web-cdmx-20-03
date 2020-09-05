const { gql } = require('apollo-server');

// Schema o TypeDefs: Qué se puede hacer
const typeDefs = gql`
  # Objeto User que se usará como argumento en el Mutation
  input UserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  # Objeto User
  type User {
    _id: ID!
    email: String!
    firstName: String!
    lastName: String!
  }

  # Objeto Movie
  type Movie {
    _id: ID!
    name: String!
    director: String!
    year: Int
  }

  type Auth {
    token: String!
  }

  # Tipo especial Query para consultas
  type Query {
    movies: [Movie!]!
  }

  # Tipo especial Mutation para creación, edición y eliminación de datos
  type Mutation {
    # Crea peliculas
    createMovie(name: String! director: String! year: Int): Movie!
    # UserInput es un argumento de tipo objeto (No es escalar)
    # Sign Up registra usuarios
    signup(user: UserInput!): User!
    # Inicia sesión a usuarios
    login(email: String! password: String!): Auth!
  }

  type Subscription {
    movieAdded: Movie!
  }
`;

module.exports = typeDefs;
