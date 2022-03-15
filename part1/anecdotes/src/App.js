import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [popular, setPopular] = useState(anecdotes.length - 1)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const nextAnecdote = () => {
    do {
      var index = Math.floor(Math.random() * anecdotes.length)
    } while (index === selected || index === popular)
    setSelected(index)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    if (copy[selected] >= copy[popular]) setPopular(selected)
    setPoints(copy)
  }

  const Anecdote = ({ title, index }) => {
    return (
      <>
        <div>
          <h2>{title}</h2>
          <p>{anecdotes[index]}</p>
          <p>has {points[index]} votes</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Anecdote title="Anecdote of the day" index={selected} />
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <Anecdote title="Anecdote with most votes" index={popular} />
    </>
  )
}

export default App
