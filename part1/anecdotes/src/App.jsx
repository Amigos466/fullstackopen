import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const defaultVotes = anecdotes.reduce((accum, anecdote, index) => ({ ...accum, [index]: 0 }), {})

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(defaultVotes);
  const mostVotedAnecdoteIndex = Object.keys(votes).sort((voteKeyA, voteKeyB) => votes[voteKeyB] - votes[voteKeyA])[0];

  const selectNectRandomAnecdote = () => {
    const max = Math.floor(anecdotes.length);
    const nextAnecdoteIndex = Math.floor(Math.random() * (max - 0) + 0);
    if (selected === nextAnecdoteIndex) {
      return selectNectRandomAnecdote();
    }
    setSelected(nextAnecdoteIndex);
  }

  const vote = () => {
    setVotes({ ...votes, [selected]: votes[selected] + 1 })
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={selectNectRandomAnecdote}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{votes[mostVotedAnecdoteIndex] ? anecdotes[mostVotedAnecdoteIndex] : 'No any votes'}</p>
    </div>
  )
}

export default App