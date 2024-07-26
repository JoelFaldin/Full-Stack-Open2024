const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./schemas/author')
const Book = require('./schemas/book')
const { GraphQLError } = require('graphql')

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
console.log('connecting to: ', MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to the database!')
  })
  .catch((error) => {
    console.log('couldnt connect to the db: ', error)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    _id: ID!
    bookCount: Int
  }

  type Books {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Books!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Books
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

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
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      try {
        const author = await Author.findOne({ name: args.author })
  
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
        return populated
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          code: 'BAD_USER_INPUT',
          error
        })
      }
    },
    editAuthor: async (root, args) => {
      try {
        const user = await Author.findOne({ name: args.name })
        if (!user) {
          return null
        }

        const newAuthor = await Author.findOneAndUpdate({ _id: user._id }, { born: args.setBornTo }, { new: true })
        return newAuthor
      } catch (error) {
        throw new GraphQLError('Couldnt update author birthday', {
          code: 'BAD_USER_INPUT',
          error
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})