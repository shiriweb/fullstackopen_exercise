const initialAnecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place.",
].map((anecdote) => ({
  content: anecdote,
  id: (100000 * Math.random()).toFixed(0),
  votes: 0,
}));

const anecdoteReducer = (state = initialAnecdotes, action) => {
  switch (action.type) {
    case "VOTE":
      return state
        .map((a) =>
          a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
        )
        .sort((a, b) => b.votes - a.votes);

    case "ADD_ANECDOTE":
      return [...state, action.payload];

    default:
      return state;
  }
};


export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    payload: id,
  };
};

export const createAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    payload: {
      content,
      id: (100000 * Math.random()).toFixed(0),
      votes: 0,
    },
  };
};

export default anecdoteReducer;
