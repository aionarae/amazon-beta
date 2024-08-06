const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    createUser(username: String!, email: String!): User
  }

  type User {
    _id: ID
    username: String
    email: String
  }
`;

module.exports = typeDefs;
