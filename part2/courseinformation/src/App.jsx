
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

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
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
      }
    ]
  }

  return <Course course={course} />
}

export default App