import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show, user }) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: favoriteGenre
    }
  })

  useEffect(() => {
    if (user) {
      setFavoriteGenre(user.favoriteGenre)
    }
  }, [user]) // eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h1>Recommendations</h1>
      {favoriteGenre && (
        <p>
          books in your favorite genre <strong>{favoriteGenre}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {booksResult.data &&
            favoriteGenre &&
            booksResult.data.allBooks
              .filter(b => b.genres.includes(favoriteGenre))
              .map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>
                    {a.author.name} {a.author.born ? `(${a.author.born})` : ''}
                  </td>
                  <td>{a.published}</td>
                  <td>{a.genres.join(', ')}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
