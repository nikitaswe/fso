import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'

const Genres = ({ genres, setGenreFilter }) => {
  return (
    <>
      <h2>Select genre:</h2>
      {genres.map(g => (
        <button key={g} onClick={() => setGenreFilter(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenreFilter(null)}>All Books</button>
    </>
  )
}

const Books = props => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [genres, setGenres] = useState([])
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreFilter
    }
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      const genresToBeSet = new Set()
      books.forEach(b => {
        b.genres.forEach(g => genresToBeSet.add(g))
      })
      setGenres(Array.from(genresToBeSet))
    }
  }, [books]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {result.loading ? (
            <tr>
              <td>loading...</td>
            </tr>
          ) : (
            books.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>
                  {a.author.name} {a.author.born ? `(${a.author.born})` : ''}
                </td>
                <td>{a.published}</td>
                <td>{a.genres.join(', ')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {genres && <Genres setGenreFilter={setGenreFilter} genres={genres} />}
    </div>
  )
}

export default Books
