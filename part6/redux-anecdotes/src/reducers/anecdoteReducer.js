import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		appendAnecdote(state, action) {
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

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	}
}

export const createNewAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(appendAnecdote(newAnecdote));
	}
}

export const upvoteAnecdote = (anecdote) => {
	return async dispatch => {
		const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote);
		dispatch(voteAnecdote(updatedAnecdote.id));
	}
}

export default anecdoteSlice.reducer;


