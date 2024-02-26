
const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Content = ({ parts }) =>
  parts.map(p => <Part key={p.key} part={p.name} exercises={p.exercises} />)

const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
)

const Total = ({ parts }) => (
  //const totalExercises = parts.reduce((accum, el) => accum + el.exercises, 0);
  <b>total of {parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises} exercises</b>
)

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App