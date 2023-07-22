import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { getAnecdotes } from './requests'

const App = () => {

  const result = useQuery("notes", getAnecdotes)

  const handleVote = (anecdote) => {
    console.log('vote')
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
