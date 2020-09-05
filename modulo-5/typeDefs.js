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

  # Tipo especial Query para consultas
  type Query {
    movies: [Movie!]!
  }

  # Tipo especial Mutation para creación, edición y eliminación de datos
  type Mutation {
    # UserInput es un argumento de tipo objeto (No es escalar)
    # Sign Up registra usuarios
    signup(user: UserInput!): User!
    createMovie(name: String! director: String! year: Int): Movie!
  }
`;

module.exports = typeDefs;
