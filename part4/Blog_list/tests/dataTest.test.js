const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const blogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: 'JA2hToTNZrzMKqWThAnkr6i1nbueKPa',
        title: 'Backend is importat',
        author: 'Arto Hellas',
        url: '',
        likes: 22,
        __v: 0
    },
]

beforeEach(async () => {
    await Blog.deleteMany()

    const blogObject = blogs.map(blog => new Blog(blog))
    const promise = blogObject.map(blog => blog.save)
    await Promise.all(promise)
})

test('blog list test', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
}, 10000)

afterAll(async () => {
    await mongoose.connection.close()
})