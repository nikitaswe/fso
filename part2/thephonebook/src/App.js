import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = e => setNewName(e.target.value)
  const handleNumberChange = e => setNewNumber(e.target.value)
  const handleFilterChange = e => setFilter(e.target.value)
  const addPerson = e => {
    e.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (person) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if (result) {
        const newObj = { ...person, number: newNumber }
        personsService
          .editPerson(newObj)
          .then(returnedPerson => {
            setSuccessMessage(
              `Number for '${returnedPerson.name}' has changed to '${returnedPerson.number}' `
            )
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
            setPersons(persons.map(p => (p.name === returnedPerson.name ? returnedPerson : p)))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Contact '${person.name}' was already deleted from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      const newObj = { name: newName, number: newNumber }
      personsService
        .createPerson(newObj)
        .then(returnedPerson => {
          setSuccessMessage(`Added '${returnedPerson.name}'`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 8000)
          setPersons([...persons])
        })
    }
  }
  const deletePerson = id => {
    const personName = persons.find(p => p.id === id).name
    const result = window.confirm(`Delete ${personName}?`)
    if (result)
      personsService
        .deletePerson(id)
        .then(response => {
          const newPersons = persons.filter(p => p.id !== id)
          setPersons(newPersons)
        })
        .catch(error => {
          setErrorMessage(`Contact '${personName}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.name !== personName))
        })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} styleName="success" />
      <Notification message={errorMessage} styleName="error" />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h3>Add new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={addPerson}
        onChangeName={handleNameChange}
        onChangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App
