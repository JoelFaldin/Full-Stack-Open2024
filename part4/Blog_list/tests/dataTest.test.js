// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')

// const api = supertest(app)

// const Blog = require('../models/blog')

// const newBlogs = [
//     {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//     },
//     {
//         _id: '67422aa73b54a101234d17f8',
//         title: 'Backend is important',
//         author: 'Arto Hellas',
//         url: '',
//         likes: 22,
//     },
// ]

// beforeEach(async () => {
//     await Blog.deleteMany({})

//     const userId1 = '65b3141c5ee5a9c8104a1729'
//     const userId2 = '65b6df85b7495d41f45be97c'

//     const blogsWithUsers = [
//         { ...newBlogs[0], user: userId1 },
//         { ...newBlogs[1], user: userId2 }
//     ]

//     await Blog.insertMany(blogsWithUsers)
//   })

// test('blog list test', async () => {
//     await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect('Content-type', /application\/json/)
// })

// test('verify id existence', async () => {
//     const keyExistence = await api
//         .get('/api/blogs')
//         .expect(200)
//         .expect(res => {
//             const json = JSON.parse(res.text);
            
//             json.forEach(element => {
//                 expect(element.id).toBeDefined()
//             });
//         })
// })

// test('adding a new blog', async () => {
//     const login = await api
//         .post('/api/login')
//         .send({
//             username: "root II",
//             password: "salainenII"
//         })
//         .expect(200)
    
//     const token = login.body.token
    
//     const newBlog = {
//         title: 'Testing the backend can be hard',
//         author: 'Daniel L.',
//         url: '/test/url/1',
//         likes: 30,
//     }

//     await api
//         .post('/api/blogs')
//         .set('Authorization', `Bearer ${token}`)
//         .send(newBlog)
//         .expect(201)
        
//     const blogResponse = await api.get('/api/blogs')
//     const blogArray = blogResponse.body.map(blog => blog.title)

//     expect(blogArray).toContain('Testing the backend can be hard')
// })

// test('checking likes property', async () => {
//     const login = await api
//         .post('/api/login')
//         .send({
//             "username": "root II",
//             "password": "salainenII"
//         })
//         .expect(200)

//     const token = login.body.token
    
//     const newBlog = {
//         title: 'The joy of seeing tests passing',
//         author: 'Daniel L.',
//         url: '/test/url/2',
//         likes: '',
//     }

//     await api
//         .post('/api/blogs')
//         .set('Authorization', `Bearer ${token}`)
//         .send(newBlog)
//         .expect(201)

//     const checkingLikes = await api.get('/api/blogs')
//     expect(checkingLikes.body[2].likes).toBe(0)
// }, 5000)

// test('testing servers response when url is not provided', async () => {
//     const newBlog = {
//         title: 'Testing the backend',
//         author: 'Daniel L.',
//         url: '',
//         likes: 18
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(400)
// })

// test('deleting a single blog', async () => {
//     const initialBlogs = await Blog.find({})
//     const blogsArray = initialBlogs.map(blog => blog.toJSON())
//     const blogToDelete = blogsArray[1]

//     const login = await api
//         .post('/api/login')
//         .send({
//             "username": "root II",
//             "password": "salainenII"
//         })
//         .expect(200)

//     const token = login.body.token
    
//     await api
//         .delete(`/api/blogs/${blogToDelete.id}`)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(204)
    
//     const finalBlogs = await Blog.find({})
//     expect(finalBlogs).toHaveLength(newBlogs.length - 1)
// })

// test('updating a blog', async () => {
//     const oldBlog = await Blog.find({})
//     const blogToUpdate = oldBlog[1]

//     const updatedBlog = {
//         title: blogToUpdate.title,
//         author: blogToUpdate.author,
//         url: blogToUpdate.url,
//         likes: 30
//     }

//     await api
//         .put(`/api/blogs/${blogToUpdate.id}`)
//         .send(updatedBlog)
//         .expect(200)
        
//     const checkingBlog = await api.get('/api/blogs')
//     expect(checkingBlog.body[1].likes).toBe(30)
// })

// test('failing with status code 401 when trying to add a new blog without token', async () => {
//     // const login = await api
//     //     .post('/api/login')
//     //     .send({
//     //         username: "root II",
//     //         password: "salainenII"
//     //     })
//     //     .expect(200)
    
//     // const token = login.body.token
    
//     const newBlog = {
//         title: 'Testing the backend can be hard',
//         author: 'Daniel L.',
//         url: '/test/url/1',
//         likes: 30
//     }

//     await api
//         .post('/api/blogs')
//         .send(newBlog)
//         .expect(401)
// })

// afterAll(async () => {
//     await mongoose.connection.close()
// })

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

after(async () => {
    await mongoose.connection.close()
})