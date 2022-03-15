import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(an => an.content.includes(state.filter))
  )
  const dispatch = useDispatch()

  const anecdoteVote = async anecdote => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You have voted for "${anecdote.content}"`, 5))
  }
  return (
    <>
      {[...anecdotes]
        .sort((a, b) => (a.votes > b.votes ? -1 : 1))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>
              <strong>{anecdote.content}</strong>
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => anecdoteVote(anecdote)}>vote</button>
              <hr></hr>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
