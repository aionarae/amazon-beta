const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String!
    username: String!
    email: String!
    password: String
    role: String
    status: String
    created_at: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Cart {
    _id: ID
    quantity: Int!
    product: Product
  }

  type Order {
    _id: ID
    user: User
    products: [Product]
    total: Float
    status: String
    created_at: String
  }

  type OrderItem {
    _id: ID
    order: Order
    product: Product
    quantity: Int!
    price: Float!
    created_at: String
  }

  type Product {
    _id: ID
    name: String!
    description: String!
    image: String
    price: Float!
    category: Category
    created_at: String
  }

  type Review {
    _id: ID
    user: User
    product: Product
    rating: Int!
    review: String!
    created_at: String
  }

  type Mutation {
    createUser(username: String!, email: String!): User
  }
`;

module.exports = typeDefs;
