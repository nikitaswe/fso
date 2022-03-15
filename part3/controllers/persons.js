const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

personsRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

personsRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
  const name = request.body.name
  const number = request.body.number
  if (!name && !number) {
    return response.status(400).json({
      error: 'Please provide name and number'
    })
  } else if (!name) {
    return response.status(400).json({
      error: 'Please provide name'
    })
  } else if (!number) {
    return response.status(400).json({
      error: 'Please provide number'
    })
  } else {
    const person = new Person({
      name: name,
      number: number,
      date: new Date()
    })
    person
      .save()
      .then(savedPerson => {
        return savedPerson.toJSON()
      })
      .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
      })
      .catch(error => next(error))
  }
})

module.exports = personsRouter
