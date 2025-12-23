import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => (
  <li>
    {anecdote.content} <strong>has {anecdote.votes} votes</strong>
    <button onClick={handleVote}>vote</button>
  </li>
)

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => dispatch(voteAnecdote(anecdote.id))}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
