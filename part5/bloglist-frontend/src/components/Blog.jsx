import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const canDelete = blog.user && user && blog.user.username === user.username;

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button className="view-button" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>

      {visible && (
        <div className="blog-details">
          <div className="blog-url">{blog.url}</div>
          <div className="blog-likes">
            likes {blog.likes}
            <button
              className="like-button"
              onClick={() =>
                updateBlog(blog.id, { ...blog, likes: blog.likes + 1 })
              }
            >
              like
            </button>
          </div>
          {canDelete && (
            <button className="remove-button" onClick={() => deleteBlog(blog.id)}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
