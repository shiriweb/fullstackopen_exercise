import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateNew = ({ addAnecdote, setNotification }) => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = {
      content,
      author,
      info,
      votes: 0,
      id: Math.floor(Math.random() * 10000),
    };
    addAnecdote(newAnecdote);
    setNotification(`A new anecdote "${content}" created!`);
    setTimeout(() => setNotification(""), 5000);
    navigate("/"); // Redirect to anecdotes list
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input value={info} onChange={(e) => setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default CreateNew;
