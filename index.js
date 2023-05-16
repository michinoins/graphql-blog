const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./graphql');

mongoose.connect('mongodb://localhost/graphql-blog', { useNewUrlParser: true, useUnifiedTopology: true });

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
