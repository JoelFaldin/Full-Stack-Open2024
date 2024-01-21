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
        url: '/test/url/1',
        likes: 30,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        
    const blogResponse = await api.get('/api/blogs')
    const blogArray = blogResponse.body.map(blog => blog.title)

    expect(blogArray).toContain('Testing the backend can be hard')
})

test('checking likes property', async () => {
    const newBlog = {
        title: 'The joy of seeing tests passing',
        author: 'Daniel L.',
        url: '/test/url/2',
        likes: '',
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const checkingLikes = await api.get('/api/blogs')
    expect(checkingLikes.body[2].likes).toBe(0)
}, 5000)

test('testing servers response when url is not provided', async () => {
    const newBlog = {
        title: 'Testing the backend',
        author: 'Daniel L.',
        url: '',
        likes: 18
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('deleting a single blog', async () => {
    const initialBlogs = await Blog.find({})
    const blogsArray = initialBlogs.map(blog => blog.toJSON())
    const blogToDelete = blogsArray[0]
    
    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        expect(204)
    
    const finalBlogs = await Blog.find({})
    expect(finalBlogs).toHaveLength(newBlogs.length - 1)
})

afterAll(async () => {
    await mongoose.connection.close()
})