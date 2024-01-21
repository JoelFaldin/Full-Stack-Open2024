const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
})

blogRouter.post('/', async (req, res) => {
    const body = req.body
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    if (body.title === '' || body.url === '') {
        res.status(400).json({ message: 'Title and url shouldnt be empty' })
        return
    }

    const blogs = await blog.save()
    res.status(201).json(blogs)
})

blogRouter.delete('/:id', async (req, res) => {
    const deletion = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).json({ message: 'Blog deleted' })
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

    await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => console.log(error))
})

module.exports = blogRouter