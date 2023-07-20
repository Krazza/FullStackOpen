import { useDispatch, useSelector } from "react-redux";
import { upvoteAnecdote } from "./reducers/anecdoteReducer";
import { updateNotification, removeNotification } from "./reducers/notificationReducer";

const Anecdote = ({anecdote, handleVote}) => {
    return(
        <li>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
          </div>
        </li>
    )
}

const AnecdoteList = () => {

    const dispatch = useDispatch();
    const anecdotes = [...useSelector(state => state.anecdotes)];
    const filter = useSelector(state => state.filter);
    
    anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : (b.votes > a.votes) ? 1 : 0);

    return(
      <div>
          <ul>
			{
				anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
				.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => { 
          dispatch(upvoteAnecdote(anecdote))
          dispatch(updateNotification(`You voted for: "${anecdote.content}"`))
          setTimeout(() => {
            dispatch(removeNotification());
          }, 5000)
        }
        }/>)
			}
          </ul>
      </div>
    )
}

export default AnecdoteList;