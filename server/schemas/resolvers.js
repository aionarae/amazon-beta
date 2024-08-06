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
  