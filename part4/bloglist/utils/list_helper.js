const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });
  return sum;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let fav = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > fav.likes) {
      fav = blog;
    }
  });

  return fav;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const count = {};

  blogs.forEach((blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1;
  });

  let topAuthor = null;
  let topCount = 0;

  for (let author in count) {
    if (count[author] > topCount) {
      topCount = count[author];
      topAuthor = author;
    }
  }

  return { author: topAuthor, blogs: topCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const likesCount = {};
  blogs.forEach((blog) => {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes;
  });
  let topAuthor = null;
  let maxLikes = 0;
  for (let author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxLikes = likesCount[author];
      topAuthor = author;
    }
  }

  return { author: topAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
