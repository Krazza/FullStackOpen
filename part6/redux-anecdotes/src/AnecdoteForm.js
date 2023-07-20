import { useDispatch } from "react-redux";
import { createNewAnecdote } from "./reducers/anecdoteReducer";
import { setNotification } from "./reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const handleNewAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(createNewAnecdote(content));
        dispatch(setNotification(`New anecdote added: "${content}"`, 5000))
    }

    return(
        <form onSubmit={handleNewAnecdote}>
            <h2>create new</h2>
            <div><input type="text" name="anecdote"/></div>
            <button type="submit">create</button>
        </form>
    );
}

export default AnecdoteForm;