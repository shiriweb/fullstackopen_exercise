import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetails = () => setDetailsVisible(!detailsVisible);

  const handleLike = () => {
    updateBlog(blog.id, { ...blog, likes: blog.likes + 1 });
  };

  const handleDelete = () => deleteBlog(blog.id);

  return (
    <div
      style={{ padding: 10, border: "solid", borderWidth: 1, marginBottom: 5 }}
    >
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>
          {detailsVisible ? "hide" : "view"}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {blog.user?.username === user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
