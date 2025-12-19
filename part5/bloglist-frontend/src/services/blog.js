let blogs = [];

const getAll = () => Promise.resolve(blogs);

const create = (blog) => {
  blog.id = Math.random().toString(36).substr(2, 9);
  blogs.push(blog);
  return Promise.resolve(blog);
};

const update = (id, updatedBlog) => {
  blogs = blogs.map((blog) => (blog.id === id ? updatedBlog : blog));
  return Promise.resolve(updatedBlog);
};

const remove = (id) => {
  blogs = blogs.filter((blog) => blog.id !== id);
  return Promise.resolve();
};

export default { getAll, create, update, remove };
