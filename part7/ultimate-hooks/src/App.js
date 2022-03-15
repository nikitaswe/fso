import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button
} from '@material-ui/core'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = baseUrl => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      console.log(response.data)
      setResources(response.data)
    }
    getAll()
  }, [])

  const create = async resource => {
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = event => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = event => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value })
  }

  return (
    <Container>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <div>
          <TextField label="Content" {...content} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </div>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(note => (
              <TableRow key={note.id}>
                <TableCell>{note.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        <div>
          <TextField label="Name" {...name} />
        </div>
        <div>
          <TextField label="Number" {...number} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </div>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {persons.map(person => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default App
