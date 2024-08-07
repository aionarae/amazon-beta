const { Cart, Category, Order, OrderItem, Product, Review, User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
    Mutation: {
      createUser: async (_, { username, email }) => {
        const newUser = new User({ username, email });
        return await newUser.save();
      },
    },
  };
  
  module.exports = resolvers;
  