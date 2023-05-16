const User = require('../models/User');
const Post = require('../models/Post');

module.exports = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => User.findById(id),
    posts: () => Post.find(),
    post: (_, { id }) => Post.findById(id),
  },
  Mutation: {
    createUser: (_, { name, email }) => User.create({ name, email }),
    createPost: async (_, { title, content, authorId }) => {
      const post = new Post({ title, content, author: authorId });
      await User.updateOne({ _id: authorId }, { $push: { posts: post.id } });
      return post.save();
    },
    updateUser: (_, { id, name, email }) => User.findByIdAndUpdate(id, { name, email }, { new: true }),
    updatePost: (_, { id, title, content }) => Post.findByIdAndUpdate(id, { title, content }, { new: true }),
    deleteUser: (_, { id }) => User.findByIdAndDelete(id),
    deletePost: (_, { id }) => Post.findByIdAndDelete(id),
  },
  User: {
    posts: async (user) => {
      return (await user.populate('posts').execPopulate()).posts;
    },
  },
  Post: {
    author: async (post) => {
      return (await post.populate('author').execPopulate()).author;
    },
  },
};
