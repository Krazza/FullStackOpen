import React from "react";

const Course = ({course}) =>{
	const exercisesArray = course.parts.map(part => part.exercises);
	const total = exercisesArray.reduce((acc, curr) => acc + curr);
	return(
	<div>
		<h2>{course.name}</h2>
		<div>{course.parts.map(part => 
			<p key={part.id}>{part.name} {part.exercises}</p>)}
		</div>
		<h3>{"Total amount of excercises:" + total}</h3>
	</div>)
}

export default Course;