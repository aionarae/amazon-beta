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
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ products: args.products.map(({ _id }) => _id) });
      // eslint-disable-next-line camelcase
      const line_items = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const product of args.products) {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              images: [`${url}/images/${product.image}`]
            },
            unit_amount: product.price * 100,
          },
          quantity: product.purchaseQuantity,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });
  },
}};
  
module.exports = resolvers;
  