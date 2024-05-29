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
        title: 'Backend is important',
        author: 'Arto Hellas',
        url: '',
        likes: 22,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON)
}

const newUsers = [
    {
        username: 'Joe II',
        password: 'joepassword',
        name: 'Joe the 2nd'
    },
    {
        username: 'Aldo Hellers',
        password: 'aldopass',
        name: 'Aldo'
    }
]

module.exports = { newBlogs, blogsInDb, newUsers }