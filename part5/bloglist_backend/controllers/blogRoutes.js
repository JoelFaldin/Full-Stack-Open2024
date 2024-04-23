const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    res.status(200).json(blogs)
})

blogRouter.post('/', async (req, res) => {
    const body = req.body
    if (body.title === '' || body.url === '') {
        res.status(401).json({ error: 'Title and url shouldnt be empty!' })
        return
    }

    const token = req.get('Authorization')
    if (!token) {
        return res.status(401).json({ error: 'You should provide a token!' })
    }

    const user = req.user

    if (user) {
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
    
            res.status(201).json({ message: `The blog '${blog.title}' was added!`})
        } catch(error) {
            res.status(401).json({ error: 'The blog is not valid!' })
        }
    } else {
        res.status(401).json({ error: 'User not found ???' })
    }
})

blogRouter.delete('/:id', async (req, res) => {
    const userRequest = req.user
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

    const searchBlog = await Blog.findById(req.params.id)
    if (searchBlog) {
        const blog = new Blog({
            _id: req.params.id,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })
    
        const result = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.status(200).json(result)
    } else {
        res.status(404).json({ message: 'Wrong blog identifier!' })
    }

    
})

module.exports = blogRouter