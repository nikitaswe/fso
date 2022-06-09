const { UserInputError, AuthenticationError } = require('apollo-server-express')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      console.log('---------------')
      console.log('allBooks query')
      console.log('genre ' + JSON.stringify(args.genre))
      console.log('---------------')
      let query = {}
      if (args.genre) query.genres = { $in: args.genre }
      try {
        let books = await Book.find(query).populate('author')
        if (args.author) books = books.filter(b => b.author.name === args.author)
        return books
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      console.log('---------------')
      console.log('me query')
      console.log('context ' + JSON.stringify(context))
      console.log('---------------')
      return context.currentUser
    }
  },
  Author: {
    bookCount: async root => {
      const lenght = await Book.find({ author: { $eq: root } }).then(result => {
        return result.length
      })
      return lenght
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
        let authorFound = await Author.findOne({ name: args.author })
        if (!authorFound) {
          const author = new Author({ name: args.author })
          authorFound = await author.save()
        }
        const book = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: authorFound
        })
        await book.save()

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, { currentUser }) => {
      try {
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }
        let author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        } else {
          author.born = args.setBornTo
          await author.save()
        }
        return author
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers
