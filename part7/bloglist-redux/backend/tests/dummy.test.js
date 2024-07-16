const listhelper = require('../utils/list_helper')

test('dummy always returns 1', () => {
    const blogs = []

    const result = listhelper.dummy(blogs)
    expect(result).toBe(1)
})