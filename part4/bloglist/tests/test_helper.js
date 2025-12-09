const Blog = require("../models/blog");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const initialBlogs = [
  { title: "Blog 1", author: "Author 1", url: "http://1.blog", likes: 2 },
  { title: "Blog 2", author: "Author 2", url: "http://2.blog", likes: 5 },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const getTestUser = async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("secret", 10);
  const user = new User({
    username: "testuser",
    passwordHash,
    name: "Test User",
  });
  return await user.save();
};

const getTokenForUser = (user) => {
  const userForToken = { username: user.username, id: user._id };
  return jwt.sign(userForToken, process.env.SECRET);
};

const nonExistingId = async () => {
  const blog = new Blog({ title: "temp", url: "http://temp", likes: 0 });
  const saved = await blog.save();
  await Blog.findByIdAndDelete(saved._id);
  return saved._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  getTestUser,
  getTokenForUser,
  nonExistingId,
};
