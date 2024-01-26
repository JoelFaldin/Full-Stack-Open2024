const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
    const body = req.body

    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)

    const user = new User({
        username: body.username,
        password: passwordHash,
        name: body.name
    })

    // Checking that fields are not empty:
    if (body.username === '' || body.password === '' || body.name === '') {
        res.status(400).json({ error: 'You should fill all fields!' })
        return
    }

    const request = await user.save()
    res.status(201).json(request)
})

module.exports = userRouter