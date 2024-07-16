const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
    res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
    const body = req.body

    // Checking that fields are not empty:
    if (body.username === '' || body.password === '' || body.name === '') {
        res.status(400).json({ error: 'You should fill all fields!' })
        return
    }

    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)

    const user = new User({
        username: body.username,
        password: passwordHash,
        name: body.name
    })
    
    try {
        const request = await user.save()
        res.status(201).json(request)
    } catch(error) {
        res.status(400).json({ error: 'Invalid user!' })
    }
})

module.exports = userRouter