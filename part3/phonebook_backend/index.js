require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const mongoose = require('mongoose')

// Connecting to MongoDB:
mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

app.get('/', (req, res) => {
    res.send('<h1>Hello there!</h1>')
})

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(contact => {
        res.json(contact)
    })
})

app.get('/info', (req, res) => {
    const num = phonebook.length
    res.send(`
        <p>Phonebook has data for ${num} contacts!</p>
        <p>${Date()}</p>`
    )
    console.log(req.headers)
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body
    
    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save()
        .then(saved => {
            res.json(saved)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    
    Contact.findById(id)
        .then(contact => {
            if (contact) {
                res.json(contact)
            } else {
                console.log('no contact found!')
                res.status(404).end()
            }
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id, { number: req.body.number }, { new: true, runValidators: true, context: 'query' })
        .then(updated => {
            res.json(updated)
        })
        .catch(error => next(error))
})

// Error handling in middlewares:
const formatError = (error, req, res, next) => {
    console.error(error)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'Malformatted id!' })
    } else if (error.name === 'ValidationError') {
        res.status(400).json({ error: error.errors.name.message })
    }
    next(error)
}
app.use(formatError)

const endpointTypo = (req, res) => {
    res.status(404).send({ error: 'You made a typo in the endpoint.' })
}
app.use(endpointTypo)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log('Server up! 🪄')
    console.log('http://localhost:3001')
    console.log('http://localhost:3001/api/persons')
})