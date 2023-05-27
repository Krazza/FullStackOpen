

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

function Header(props)
{
    return(<h1>{props.course}</h1>);
}

function Content(props)
{
    return(
    <>
        <Part partName={props.parts[0].name} partExercises={props.parts[0].exercises}/>
        <Part partName={props.parts[1].name} partExercises={props.parts[1].exercises}/>
        <Part partName={props.parts[2].name} partExercises={props.parts[2].exercises}/>
    </>
    );
}

function Part(props)
{
    return(<p>{props.partName} {props.partExercises}</p>);
}

function Total(props)
{
    return(
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}

export default App

