const { Cart, Category, Order, OrderItem, Product, Review, User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {

    // get all users

    //get a user by username
    user: async (parent,args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'order.products',
          populate: 'category'
        });

        user.order.sort((a, b) => b.created_at - a.created_at);

        return user;
      }
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
  