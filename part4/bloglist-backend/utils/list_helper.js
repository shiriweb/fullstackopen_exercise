const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce(
    (fav, blog) => (blog.likes > (fav.likes || 0) ? blog : fav),
    {}
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const count = {};

  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });

  const maxAuthor = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  return {
    author: maxAuthor,
    blogs: count[maxAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const count = {};

  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + (blog.likes || 0);
  });

  const maxAuthor = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  return {
    author: maxAuthor,
    likes: count[maxAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
