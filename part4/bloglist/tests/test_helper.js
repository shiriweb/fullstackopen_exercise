const Blog = require("../models/blog");

const initialBlogs = [
  { title: "First blog", author: "Alice", url: "http://first.com", likes: 5 },
  { title: "Second blog", author: "Bob", url: "http://second.com", likes: 3 },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
