// utils/list_helper.js

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav));
};

const mostBlogs = (blogs) => {
  const counts = {};
  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
  });
  const topAuthor = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
  return {
    author: topAuthor,
    blogs: counts[topAuthor],
  };
};

const mostLikes = (blogs) => {
  const counts = {};
  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes;
  });
  const topAuthor = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );
  return {
    author: topAuthor,
    likes: counts[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
