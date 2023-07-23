import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();
  const result = useQuery("anecdotes", getAnecdotes)
  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes : anecdote.votes + 1 }, { 
      onError: () => {
        dispatch({type: "UPDATE", payload: `Failed to upvote an anecdote`});
        setTimeout(() => {
          dispatch({type: "CLEAR"});
      }, 5000)
    },
      onSuccess: () => {
        dispatch({type: "UPDATE", payload: `Voted for: ${anecdote.content}`});
        setTimeout(() => {
          dispatch({type: "CLEAR"});
      }, 5000)
    }
  });
  }


  if(result.isLoading) {
    return <div>{"loading..."}</div>
  }

  if(result.isError){
    return <div>{"anecdote service is not available due to server error"}</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
