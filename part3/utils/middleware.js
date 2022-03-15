const logger = require('./logger')

const morgan = require('morgan')
morgan.token('content', function (req, res) {
  return JSON.stringify(req.body)
})

const requestLogger = morgan(
  'Method: :method\nPath: :url\nStatus: :status\nContent-length: :res[content-length]\nResponse-time: :response-time ms\nContent: :content\n---'
)

// const requestLogger = (request, response, next) => {
//   logger.info('Method:', request.method)
//   logger.info('Path:  ', request.path)
//   logger.info('Body:  ', request.body)
//   logger.info('---')
//   next()
// }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
