import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList  from "./AnecdoteList";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App