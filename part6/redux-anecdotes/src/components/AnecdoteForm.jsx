import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch  ();
  const addAnecdote = () => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };
  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" placeholder="Write new anecdote" />
      <button type="submit">Create</button>
    </form>
  );
};

export default AnecdoteForm;
