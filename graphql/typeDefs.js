const { gql } = require('apollo-server');

module.exports = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(title: String!, content: String!, authorId: ID!): Post
    updateUser(id: ID!, name: String, email: String): User
    updatePost(id: ID!, title: String, content: String): Post
    deleteUser(id: ID!): User
    deletePost(id: ID!): Post
  }
`;
