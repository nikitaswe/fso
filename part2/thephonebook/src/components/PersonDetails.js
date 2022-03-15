import React from 'react'

const PersonDetails = ({ id, name, number, deletePerson }) => {
  return (
    <li>
      {name} {number} <button onClick={() => deletePerson(id)}>delete</button>
    </li>
  )
}

export default PersonDetails
