const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters, got {VALUE}'],
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: [8, 'Number must be at least 8 characters, got {VALUE}'],
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  }
})
personSchema.plugin(uniqueValidator, { message: '{PATH} {VALUE} must to be unique.' })
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
