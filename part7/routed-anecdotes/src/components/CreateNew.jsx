import { useField } from "../hooks";
import { useNavigate } from "react-router-dom";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    navigate("/");
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const { reset: resetContent, ...contentInput } = content;
  const { reset: resetAuthor, ...authorInput } = author;
  const { reset: resetInfo, ...infoInput } = info;

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        content <input {...contentInput} /> <br />
        author <input {...authorInput} /> <br />
        url for more info <input {...infoInput} /> <br />
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
