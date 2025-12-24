import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5));
  };

  return (
    <div>
      {anecdotes.map((a) => (
        <div key={a.id}>
          {a.content} has {a.votes} votes
          <button onClick={() => handleVote(a)}>vote</button>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
