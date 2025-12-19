const Blog = ({ blog }) => {
  return (
    <div>
      <strong>{blog.title}</strong> – {blog.author}
    </div>
  );
};

export default Blog;
