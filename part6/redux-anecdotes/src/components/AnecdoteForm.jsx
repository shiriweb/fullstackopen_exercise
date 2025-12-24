import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests/requests";
import NotificationContext from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);

  const createMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]) || [];
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));

      dispatch({
        type: "SET",
        payload: `Added anecdote: "${newAnecdote.content}"`,
      });
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
    onError: (error) => {
      dispatch({ type: "SET", payload: `Error: ${error.message}` });
      setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 5) {
      alert("Anecdote must be at least 5 characters");
      return;
    }
    createMutation.mutate({ content, votes: 0 });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write anecdote"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AnecdoteForm;
