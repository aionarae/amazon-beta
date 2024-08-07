const { Cart, Category, Order, OrderItem, Product, Review, User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    //get a user by username
    user: async (parent, { username }) => {
      return

      
    },

    // cart
    cart: async (parent, { _id }) => {
      return Cart.findById(_id);
    },

    category: async (parent, { _id }) => {
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
    review: async (parent, { _id }) => {
      return Review
    },

  },
}
  
module.exports = resolvers;
  