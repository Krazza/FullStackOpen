import { useState } from 'react';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);
	const [average, setAverage] = useState(0);
	const [posPercent, setPosPercent] = useState(0);

	const handleClick = (setter) => {
		return () => {
			let newBad = bad;
			let newNeutral = neutral;
			let newGood = good;
			let newTotal = total + 1;

			switch(setter) {
				case "bad": 
					newBad+=1;
					setBad(newBad);
					setAverage((newGood - newBad)/newTotal);
					break;
				case "neutral": 
					newNeutral+=1; 
					setNeutral(newNeutral);
					break;
				case "good": 
					newGood+=1;
					setGood(newGood);
					setAverage((newGood - newBad)/newTotal);
					break;
				default:
					break;
			}
			setTotal(newTotal);
			setPosPercent((newGood * 100)/newTotal);
		}
	}

	return (
		<table>
			<thead>
				<tr>
					<td><h1>{"Give feedback"}</h1></td>
				</tr>
			</thead>
			<tbody>
			<tr>
				<td>
					<Button text={"bad"} handleClick={handleClick("bad")}/>
					<Button text={"neutral"} handleClick={handleClick("neutral")}/>
					<Button text={"good"} handleClick={handleClick("good")}/>
				</td>
			</tr>
			{total===0 ? <tr><td><p>{"No feedback gathered."}</p></td></tr>: <Statistics bad={bad} neutral={neutral} good={good} total={total} average={average} posPercent={posPercent}/>}
			</tbody>
		</table>
	)
}

const Button = ({text, handleClick}) => {
	return(
		<button onClick={handleClick}>{text}</button>
	)
}

const Statistics = ({bad, neutral, good, total, average, posPercent}) => {
	return(
		<>
		<tr>
			<td>
				<h2>{"Statistics"}</h2>
			</td>
		</tr>
			<StatisticLine text={"Bad:"} value={bad}/>
			<StatisticLine text={"Neutral:"} value={neutral}/>
			<StatisticLine text={"Good:"} value={good}/>
			<StatisticLine text={"Total:"} value={total}/>
			<StatisticLine text={"Average:"} value={average}/>
			<StatisticLine text={"Positive:"} value={`${posPercent}%`}/>
		</>
	)
}

const StatisticLine = ({text, value}) => {
	return(
		<tr><td><p>{text} {value}</p></td></tr>
	)
}

export default App