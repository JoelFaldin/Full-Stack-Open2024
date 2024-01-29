const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.status(200).json(blogs)
})

blogRouter.post('/', async (req, res) => {
    const body = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'The token is invalid!!' })
    }
    
    if (body.title === '' || body.url === '') {
        res.status(400).json({ message: 'Title and url shouldnt be empty' })
        return
    }

    const user = await User.findOne({ username: decodedToken.username })

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    try {
        const blogs = await blog.save()
        user.blogs = user.blogs.concat(blogs._id)
        await user.save()

        res.status(201).json(blogs)
    } catch(error) {
        res.status(400).json({ error: 'The blog is not valid!' })
    }
})

blogRouter.delete('/:id', async (req, res) => {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'The token is invalid!!' })
    }

    const userRequest = await User.findOne({ username: decodedToken.username })
    const blog = await Blog.findOne({ _id: req.params.id }).populate('user', { username: 1 })

    if (userRequest._id.toString() === blog.user._id.toString()) {
        await Blog.findByIdAndDelete(req.params.id)
        res.status(204).json({ message: 'BLog deleted!' })
    } else {
        res.status(401).json({ message: 'You are not the creator of the blog!' })
    }
})

blogRouter.put('/:id', async (req, res) => {
    const body = req.body

    const blog = new Blog({
        _id: req.params.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    const result = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
    res.status(200).json(result)
})

module.exports = blogRouter