const Header = ({ course }) => (
    <h1>{course}</h1>
)

const Content = ({ parts }) =>
    parts.map(p => <Part key={p.id} part={p.name} exercises={p.exercises} />)

const Part = ({ part, exercises }) => (
    <p>
        {part} {exercises}
    </p>
)

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((accum, el) => accum + el.exercises, 0);
    return (
        <b>total of {totalExercises} exercises</b>
    )
}

const Course = ({ course }) => (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course;