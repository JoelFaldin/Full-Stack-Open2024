require('dotenv').config()
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
    logger.data(`Port used: ${config.PORT}`)
    logger.data(`http://localhost:${config.PORT}/api/users`)
})