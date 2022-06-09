import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  // eslint-disable-next-line no-unused-vars
  const { loading, error, data, refetch } = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      client.cache.updateQuery(
        {
          query: ALL_BOOKS,
          variables: { genre: null }
        },
        ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(addedBook)
          }
        }
      )
    }
  })

  useEffect(() => {
    const browserToken = localStorage.getItem('user-token')
    if (browserToken) setToken(browserToken)
  }, [])

  useEffect(() => {
    console.log('Trying to set a user')
    if (data) {
      console.log('data ' + JSON.stringify(data))
      setUser(data.me)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [token]) // eslint-disable-line

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('books')
  }

  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} token={token} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} user={user} />
      <Login show={page === 'login'} setToken={setToken} setPage={setPage} setError={notify} />
    </div>
  )
}

export default App
