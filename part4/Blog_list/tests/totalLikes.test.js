const { test, describe } = require('node:test')
const assert = require('node:assert')

const listhelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
          likes: 5,
          __v: 0
        }
      ]

    test('with only one blog, it equals the likes of that', () => {
        const result = listhelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })
})
