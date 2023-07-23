import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {

  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, { 
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content}, {
      onError: () => {
        dispatch({type: "UPDATE", payload: `Failed to create an anecdote`});
        setTimeout(() => {
          dispatch({type: "CLEAR"});
      }, 5000)
    },
      onSuccess: () => {
        dispatch({type: "UPDATE", payload: `Created an anecdote: ${content}`});
        setTimeout(() => {
          dispatch({type: "CLEAR"});
      }, 5000)
    }
    })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
