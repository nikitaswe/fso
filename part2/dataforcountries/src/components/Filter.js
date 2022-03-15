import React from 'react'

const Filter = ({ filter, onChange }) => {
  return (
    <form>
      find countries: <input value={filter} onChange={onChange} />
    </form>
  )
}

export default Filter
