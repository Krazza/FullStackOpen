import { useEffect } from "react";
import AnecdoteForm from "./AnecdoteForm";
import AnecdoteList  from "./AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./Filter";
import { useDispatch } from "react-redux";
import anecdoteService from "./services/anecdotes"
import { setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteList/>
      <Filter/>
      <AnecdoteForm/>
    </div>
  )
}

export default App