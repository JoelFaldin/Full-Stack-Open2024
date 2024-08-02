const { GraphQLError, subscribe } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./schemas/author')
const Book = require('./schemas/book')
const User = require('./schemas/user')

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments(),
    authorCount: async () => Author.countDocuments(),
    allBooks: async (root, args) => {
      try {
        let filteredBooks = await Book.find({}).populate('author').exec()
        
        // if (args.author) {
        //   filteredBooks = filteredBooks.filter(b => b.author.name === args.author)
        // }
        if (args.genre) {
          filteredBooks = await Book.find({ genres: args.genre }).populate('author').exec()
        }

        return filteredBooks
      } catch (error) {
        throw new GraphQLError('Couldnt retrieve books from the database', {
          code: 'BAD_USER_INPUT',
          error
        }) 
      }
    },
    allAuthors: async () => {
      try {
        const authors = await Author.find({})
        const books = await Book.find({})
        
        const finalAuthors = authors.map(author => ({ ...author.toObject(), bookCount: books.filter(b => b.author.toString() === author._id.toString()).length }))
        return finalAuthors
      } catch (error) {
        throw new GraphQLError('Couldnt retrieve authors from the database', {
          code: 'BAD_USER_INPUT',
          error
        })
      }
    },
    me: async (root, args, context) => {
      return context.currentUser
    },
    filterBooks: async (root, args) => {
      try {
        const searchBooks = await Book.find({ genres: { $in: [args.genre] } }).populate('author').exec()
        return searchBooks
      } catch (error) {
        throw new GraphQLError(error.toString(), {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('user not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        let author = await Author.findOne({ name: args.author })
  
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
  
        const book = new Book({
          title: args.title,
          published: args.published,
          author: author._id,
          genres: args.genres
        })

        const savedBook = await book.save()
        const populated = await Book.findOne({ _id: savedBook._id }).populate('author').exec()
        
        pubsub.publish('BOOK_ADDED', { bookAdded: populated })

        return populated
      } catch (error) {
        throw new GraphQLError(error.toString(), {
          code: 'BAD_USER_INPUT',
          error
        })
      }


    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('user not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const user = await Author.findOne({ name: args.name })
        if (!user) {
          return null
        }

        const newAuthor = await Author.findOneAndUpdate({ _id: user._id }, { born: args.setBornTo }, { new: true })
        return newAuthor
      } catch (error) {
        throw new GraphQLError(error.toString(), {
          code: 'BAD_USER_INPUT',
          error
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const user = new User({ name: args.username, favoriteGenre: args.favoriteGenre })

        await user.save()
        return { name: user.name, favoriteGenre: user.favoriteGenre, id: user._id }
      } catch (error) {
        throw new GraphQLError('Saving the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ name: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials mate', {
          extensions: {
            code: 'BAD_USER_INPUT '
          }
        })
      }

      const userObject = {
        username: user.name,
        id: user._id
      }

      return { value: jwt.sign(userObject, process.env.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers