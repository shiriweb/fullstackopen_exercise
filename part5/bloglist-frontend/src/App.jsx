import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage(`Welcome ${user.name}`);

      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage("wrong credentials");
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    const returnedBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(returnedBlog));

    setTitle("");
    setAuthor("");
    setUrl("");

    setMessage(`Added blog ${returnedBlog.title}`);
    setTimeout(() => setMessage(null), 3000);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>

          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url
          <input value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>

      <h3>blogs</h3>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
