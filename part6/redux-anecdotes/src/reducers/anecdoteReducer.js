import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { content: "If it hurts, do it more often", id: 1, votes: 0 },
  {
    content: "Adding manpower to a late software project makes it later",
    id: 2,
    votes: 0,
  },
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push({ content: action.payload, id: generateId(), votes: 0 });
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const updated = { ...anecdote, votes: anecdote.votes + 1 };
      return state.map((a) => (a.id !== id ? a : updated));
    },
  },
});

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
