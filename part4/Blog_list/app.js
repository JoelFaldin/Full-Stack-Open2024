const express = require('express')
const app = express()
const cors = require('cors')
// Currently using mongoose@7.6.5
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogRoutes')

const mongoURL = config.MONGO_URL
mongoose.connect(mongoURL)
    .then(() => {
        logger.data('DataBase conected! 🛸')
    })
    .catch(error => {
        logger.problem('DataBase refused to connect. ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app