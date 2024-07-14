const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')

describe('Creating new users tests', () => {
    test('Passing a number as the username', async () => {
        const user = {
            username: "as",
            password: "dfjknv723",
            name: "Test"
        }

        const response = await api.post('/api/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Invalid user!')
    })

    test('Sending an empty string as a required value', async () => {
        const user = {
            username: "",
            password: "testpassword1234",
            name: "New Test"
        }

        const response = await api.post('/api/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('You should fill all fields!')
    })

    test('Sending an already existing user', async () => {
        const user = {
            username: "Joe II",
            password: "newtestpassword2873",
            name: "Joe the 2nd"
        }

        const response = await api.post('/api/users').send(user)

        expect(response.status).toBe(400)
        expect(response.body.error).toBe('Invalid user!')
    })
})