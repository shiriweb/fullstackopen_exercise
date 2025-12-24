import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  showNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const handleVote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(showNotification(`You voted for "${content}"`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <ul>
      {anecdotes.map((a) => (
        <li key={a.id}>
          {a.content} — {a.votes}
          <button onClick={() => handleVote(a.id, a.content)}>vote</button>
        </li>
      ))}
    </ul>
  );
};

export default AnecdoteList;
