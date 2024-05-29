const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany()
    console.log('cleared')

    const blogObject = helper.newBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)

    console.log('done')
})

test('returns correct amount in correct format', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.length, helper.newBlogs.length)
})

test('verify unique identifier', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect(result => {
            const json = JSON.parse(result.text)
            
            json.forEach(element => {
                assert('id' in element)
            })
        })
})

test('adding a new blog', async () => {
    const newBlog = {
        title: 'Node:test is interesting',
        author: 'Joel F',
        likes: 2,
        url: 'blogs.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await helper.blogsInDb()
    assert.strictEqual(response.length, helper.newBlogs.length + 1)
})

test('checking likes property', async () => {
    const newBlog = {
        title: 'Node:test is interesting',
        author: 'Joel F',
        url: 'blogs.com'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await Blog.find({ title: 'Node:test is interesting' })
    assert.strictEqual(result[0].likes, 0)
})

test('testing servers response when url or title are not provided', async () => {
    const noTitleBlog = {
        author: 'Aldo Hellers',
        url: 'interestingurl.com',
        likes: 21
    }

    await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)

    const noUrlBlog = {
        title: 'Testing is important',
        author: 'Aldo Hellers',
        likes: 22
    }

    await api
        .post('/api/blogs')
        .send(noUrlBlog)
        .expect(400)
})

test('deleting a specific blog', async () => {
    const blogsAtStart = await Blog.find({})
    const blogToDelete = await blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    const content = blogsAtEnd.map(element => element.title)
    
    assert(!content.includes(blogToDelete.title))
    assert(content.length, blogsAtStart - 1)
})

test('udpate a blog', async () => {
    const initialBlogs = await Blog.find({})
    const blogToUpdate = initialBlogs[0]
    
    const updatedBlog = {
        _id: blogToUpdate._id,
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: blogToUpdate.likes + 1
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)

    const updatedBlogs = await Blog.find({})
    assert(updatedBlogs[0].likes, initialBlogs[0].likes + 1)
})

after(async () => {
    await mongoose.connection.close()
})