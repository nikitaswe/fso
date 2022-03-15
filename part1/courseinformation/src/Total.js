import React from 'react'

const Total = ({ parts }) => {
  const number = parts.reduce((prev, curr) => prev + curr.exercises, 0)
  return <p>Number of exercises {number}</p>
}

export default Total
