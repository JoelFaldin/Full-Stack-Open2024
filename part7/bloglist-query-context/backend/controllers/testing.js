const router = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

router.delete('/reset', async (req, res) => {
    await User.deleteMany()
    await Blog.deleteMany()

    res.status(204).end()
})

router.delete('/delete/blogs', async (req, res) => {
    await Blog.deleteMany()
    
    res.status(204).end()
})

module.exports = router