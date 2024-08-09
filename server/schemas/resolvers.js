const { Cart, Category, Order, OrderItem, Product, Review, User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    user: async () => User.find({}),


    categories: async (parent, { _id }) => {
      return Category.findById(_id);
    },

    order: async (parent, { _id }) => {
      return Order.findById(_id);
    },

    // product
    product: async (parent, { _id }) => {
      return Product.findById(_id);
    },

    // review
    reviews: async (parent, { _id }) => {
      return Review
    },

  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { username, email, password }) => {
        const user = await User.findOne({ username, email });
        if (!user) {
            throw new AuthenticationError('Incorrect Uername or Password');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new AuthenticationError('Incorrect Username or Password');
        }
        const token = signToken(user);
        return { token, user };
    },
  }
}
  
module.exports = resolvers;
  