const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./schemas/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

mongoose.set('strictQuery', false)

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI
console.log('connecting to:', MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('connected to the database!')
  })
  .catch((error) => {
    console.log('couldnt connect to the db: ', error)
  })

mongoose.set('debug', true)

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use('/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )

  const port = 4000

  httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
}

start()