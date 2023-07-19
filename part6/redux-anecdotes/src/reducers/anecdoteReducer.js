import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
			const newAnecdote = action.payload;
			return [...state, newAnecdote];
		},
		voteAnecdote(state, action) {
			const id = action.payload;
			const anecdoteToVote = state.find(anecdote => anecdote.id === id);
			const changedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
			return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;


