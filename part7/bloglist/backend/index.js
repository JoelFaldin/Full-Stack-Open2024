require('dotenv').config()
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.data(`Port used: ${config.PORT}`)
  logger.data(`http://localhost:${config.PORT}/api/users`)
  logger.data(`http://localhost:${config.PORT}/api/blogs`)
})

// Blog list users:
// username: Joe II
// password: joe2pass
// name: Joe

// username: root
// password: rootpass
// name: Superuser

// username: root II
// password: root2pass
// name: Superuser 2nd