const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./helper')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany()
    console.log('cleared')

    const userObject = helper.newUsers.map(user => new User(user))
    const promiseArray = userObject.map(user => user.save())
    await Promise.all(promiseArray)

    console.log('done')
})

describe('Creating new users tests', () => {
    test('sending an username with 2 characters', async () => {
        const user = {
            username: "as",
            password: "strongpassword123",
            mame: "tester"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)

        assert.strictEqual(response.body.error, 'Invalid user!')
    })

    test('Sending an empty string as a required value', async () => {
        const user = {
            username: "",
            password: "testpassword1234",
            name: "New Test"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)

        assert.strictEqual(response.body.error, 'You should fill all fields!')
    })

    test('Sending an already existing user', async () => {        
        const user = {
            username: "Joe II",
            password: "newtestpassword2873",
            name: "Joe the 2nd"
        }

        const response = await api
            .post('/api/users')
            .send(user)
            .expect(400)

        assert.strictEqual(response.body.error, 'Invalid user!')
    })
})

after(async () => {
    await mongoose.connection.close()
})