import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0);
  const [anecdoteOfTheDay, setAnecdoteOfTheDay] = useState("");
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length));

  const Next = () =>{
	GenerateAnecdote()
  }

  const GenerateAnecdote = () =>{
	const randomIndex = Math.floor(Math.random() * anecdotes.length)
	setSelected(randomIndex);
  }

  const Vote = () =>{
	const newVotes = votes;
	newVotes[selected]+=1;
	setVotes([...newVotes]);
	setAnecdoteOfTheDay(anecdotes[GetAnecdoteOfTheDayIndex()]);
  }

  const GetAnecdoteOfTheDayIndex = () =>{
	let max = 0;
	let maxIndex = 0;
	for(let i = 0; i < votes.length; i++){
		if(max < votes[i])
		{
			max = votes[i];
			maxIndex = i;
		}
	}
	return maxIndex;
  }

  return (
    <div>
		<div>
			<h1>{"Random anecdote"}</h1>
    		<p>{anecdotes[selected]}</p>
			<p>{`${votes[selected]} votes.`}</p>
			<Button text={"Next"} handleClick={()=> Next()}/>
			<Button text={"Vote"} handleClick={()=> Vote()}/>
		</div>
		{anecdoteOfTheDay === "" ? 
			<div><p>{"Vote for an anecdote to reveal the anecdote of the day."}</p> </div> 
			: 
			<div>
			<h2>{"Anecdote of the day"}</h2>
			<p>{anecdoteOfTheDay}</p>
			<p>{`Anecdote of the day has ${votes[GetAnecdoteOfTheDayIndex()]} votes.`}</p>
		</div>}
    </div>
  )
}

const Button = ({text, handleClick}) => {
	return(
		<button onClick={handleClick}>{text}</button>
	)
}

export default App