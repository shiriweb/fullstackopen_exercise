import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnecdote } from "../requests/requests";
import NotificationContext from "../contexts/NotificationContext";

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const notes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.setQueryData(
        ["anecdotes"],
        notes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a))
      );

      dispatch({
        type: "SET",
        payload: `You voted for: "${updatedAnecdote.content}"`,
      });
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
  });

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          {anecdote.content} (votes: {anecdote.votes})
          <button
            onClick={() =>
              voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
            }
          >
            vote
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AnecdoteList;
