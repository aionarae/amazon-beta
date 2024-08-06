
// schema/index.js
const { gql } = require('apollo-server');

// Define your type definitions
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Export the type definitions and resolvers
module.exports = {
  typeDefs,
  resolvers,
};

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };

