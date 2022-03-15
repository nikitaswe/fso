import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const create = async e => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`You have created "${anecdote}"`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

const ConnectedAnecdoteForm = connect(null, {
  createAnecdote,
  setNotification
})(AnecdoteForm)
export default ConnectedAnecdoteForm
