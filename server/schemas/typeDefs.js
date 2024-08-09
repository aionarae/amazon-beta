const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    email: String!
    password: String!
    username: String!
    role: String
    status: String
    created_at: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Category {
    _id: ID
    name: String!
    description: String
    image: String
    status: String
    created_at: String
  }

  type Order {
    _id: ID
    user: User
    products: [Product]
    total: Float
    status: String
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

  type Query {
    user: User
    categories: [Category]
    order(_id: ID!): Order
    product(_id: ID!): Product
    reviews(_id: ID!): [Review]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    addProduct(name: String!, description: String!, price: Float!): Product
    addCategory(name: String!): Category
    addReview(rating: Int!, review: String!): Review
    addOrder: Order
  }
`;

module.exports = typeDefs;
