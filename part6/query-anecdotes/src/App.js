import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient();
  const result = useQuery("anecdotes", getAnecdotes)
  const updateMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    }
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({...anecdote, votes : anecdote.votes + 1 });
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
