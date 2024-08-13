const { Cart, Category, Order, OrderItem, Product, Review, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find().populate('category');
    },

    users: async (parent, { id }) => {
      return await User.findById(id);
    },

    categories: async () => {
      return await Category.find();
    },

    orders: async (parent, { _id }) => {
      return await Order.findById(_id);
    },

    products: async (parent, { id }) => {
      return await Product.findById(id).populate('category');
    },

    reviews: async (parent, { id }) => {
      return await Review.findById(id);
    },
  },
  Mutation: {
    addProduct: async (parent, { input }) => {
      const product = await Product.create(input);
      return product;
    },

    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({ username, email });
      if (!user) {
        throw new AuthenticationError('Incorrect Username or Password');
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
      const line_items = [];

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

      return { id: session.id, products: args.products, total: session.amount_total / 100 };
    },
  },
};

module.exports = resolvers;