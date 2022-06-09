import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Authors = props => {
  const result = useQuery(ALL_AUTHORS)

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      {
        query: ALL_BOOKS,
        variables: { genre: null }
      }
    ]
  })

  const [name, setName] = useState((!result.loading && result.data.allAuthors[0].name) || '')
  const [born, setBorn] = useState('')

  const submit = async e => {
    e.preventDefault()
    updateAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.loading ? (
            <tr>
              <td>loading...</td>
            </tr>
          ) : (
            result.data.allAuthors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {props.token && (
        <>
          <h2>Set birth year</h2>
          <form onSubmit={submit}>
            <select value={name} onChange={e => setName(e.target.value)}>
              <option value="default" hidden>
                Choose a name
              </option>
              {!result.loading &&
                result.data.allAuthors.map(a => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
            </select>
            <div>
              born
              <input value={born} onChange={({ target }) => setBorn(target.value)} />
            </div>
            <button type="submit">update author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
