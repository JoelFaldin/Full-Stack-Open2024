const { test, describe } = require('node:test')
const assert = require('node:assert')
const listhelper = require('../utils/list_helper')

test('dummy always returns 1', () => {
    const blogs = []

    const result = listhelper.dummy(blogs)
    assert.strictEqual(result, 1)
})