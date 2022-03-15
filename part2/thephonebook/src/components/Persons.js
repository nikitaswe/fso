import React from 'react'
import PersonDetails from './PersonDetails'

const Persons = ({ persons, filter, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons.map(
          ({ name, id, number }) =>
            name.toLowerCase().includes(filter) && (
              <PersonDetails
                key={id}
                id={id}
                name={name}
                number={number}
                deletePerson={deletePerson}
              />
            )
        )}
      </ul>
    </div>
  )
}

export default Persons
