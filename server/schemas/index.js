
// schema/index.js
const { gql } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// Define your type definitions

// Export the type definitions and resolvers
module.exports = {
  typeDefs,
  resolvers,
};



module.exports = { typeDefs, resolvers };

