
const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ parts }) => (
  // parts.map(p => <Part key={p.key} part={p.name} exercises={p.exercises} />)...
  <>
    <Part key={parts[0].name} part={parts[0].name} exercises={parts[0].exercises} />
    <Part key={parts[1].name} part={parts[1].name} exercises={parts[1].exercises} />
    <Part key={parts[2].name} part={parts[2].name} exercises={parts[2].exercises} />
  </>
)

const Total = ({ parts }) => (
  //const totalExercises = parts.reduce((accum, el) => accum + el.exercises, 0);
  <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
)

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

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
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App