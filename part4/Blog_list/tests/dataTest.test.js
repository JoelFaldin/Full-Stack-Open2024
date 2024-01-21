const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const newBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '67422aa73b54a101234d17f8',
        title: 'Backend is importat',
        author: 'Arto Hellas',
        url: '',
        likes: 22,
        __v: 0
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(newBlogs)
  })

test('blog list test', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test('verify id existence', async () => {
    const keyExistence = await api
        .get('/api/blogs')
        .expect(200)
        .expect(res => {
            const json = JSON.parse(res.text);
            
            json.forEach(element => {
                expect(element.id).toBeDefined()
            });
        })
})

test('adding a new blog', async () => {
    const newBlog = {
        title: 'Testing the backend can be hard',
        author: 'Daniel L.',
        url: '',
        likes: 30,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        
    const blogResponse = await api.get('/api/blogs')
    const blogArray = blogResponse.body.map(blog => blog.title)

    expect(blogArray).toContain('Testing the backend can be hard')
})

afterAll(async () => {
    await mongoose.connection.close()
})