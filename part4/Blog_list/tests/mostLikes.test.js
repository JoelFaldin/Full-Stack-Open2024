const { test, describe } = require('node:test')
const assert = require('node:assert')
const listhelper = require('../utils/list_helper')

describe('Most liked author', () => {
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
        {
            _id: '83lmkvoTNlkfdvnmWThAnkr6i1nblnkwdq2',
            title: 'Frontend is also important',
            author: 'Arto Hellas',
            url: '',
            likes: 39,
            __v: 0
        },
    ]

    const author = {
        author: "Arto Hellas",
        likes: 61
    }
    
    test('The author with the most liked blog', () => {
        const result = listhelper.mostLikes(blogs)
        assert.deepStrictEqual(result, author)
    })
})