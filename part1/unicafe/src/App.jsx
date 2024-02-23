import { useState } from 'react'

const StatisticLine = ({ text, value }) => (
  <p>{text} {value}</p>
)

const Statistics = ({ title, good, bad, neutral }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = good / all * 100;

  return (
    <>
      <h2>{title}</h2>
      {all ?
        <>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </>
        : 'No feedback given'}
    </>
  )
}

const Button = ({ title, handleFeedback }) => (
  <button onClick={handleFeedback}>{title}</button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button title="good" handleFeedback={() => setGood(good + 1)} />
      <Button title="neutral" handleFeedback={() => setNeutral(neutral + 1)} />
      <Button title="bad" handleFeedback={() => setBad(bad + 1)} />
      <Statistics
        title="statistics"
        good={good}
        neutral={neutral}
        bad={bad} />
    </div>
  )
}

export default App;