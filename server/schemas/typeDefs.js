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
    id: ID!
    name: String!
    price: Float!
    category: Category!
  }

  input ProductInput {
    name: String!
    price: Float!
  }

  type Checkout {
    id: ID!
    products: [Product!]!
    total: Float!
  }

  type Review {
    _id: ID
    user: User
    product: Product
    rating: Int
    review: String
    created_at: String
  }

  type Query {
    products: [Product!]!
    user(id: ID!): User
    categories: [Category]
    order(_id: ID!): Order
    product(id: ID!): Product 
    review(id: ID!): Review
  }

  type Mutation {
    addProduct(input: ProductInput!): Product!
    login(username: String!, email: String!, password: String!): Auth 
    createUser(username: String!, email: String!, password: String!): Auth
    checkout(products: [ProductInput!]!): Checkout!
  }
`;

module.exports = typeDefs;