import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList  from "./AnecdoteList";
import Filter from "./Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <Filter/>
      <AnecdoteForm/>
    </div>
  )
}

export default App