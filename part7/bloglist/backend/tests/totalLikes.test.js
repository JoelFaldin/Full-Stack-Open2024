const listhelper = require('../utils/list_helper')

describe('total of likes', () => {
    const oneBlogList = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
    ]

    test('with only one blog, it equals the likes of that', () => {
        const result = listhelper.totalLikes(oneBlogList)
        expect(result).toBe(5)
    })
})