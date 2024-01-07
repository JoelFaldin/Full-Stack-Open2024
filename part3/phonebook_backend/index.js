require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())
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

// Connecting to MongoDB:
mongoose.set('strictQuery', false)

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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const contact = phonebook.find(p => p.id === id)
    
    if (contact) {
        res.json(contact)        
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(p => p.id !== id)
    
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    // if (!body.name) {
    //     return res.status(400).json({
    //         error: 'Name missing!'
    //     })
    // } else if (!body.number) {
    //     return res.status(400).json({
    //         error: 'Number missing!'
    //     })
    // } else if (phonebook.find(p => p.name === body.name)) {
    //     return res.status(400).json({
    //         error: 'Person already added!'
    //     })
    // }
    
    const contact = new Contact({
        "name": body.name,
        "number": body.number
    })

    contact.save().then(saved => {
        res.json(saved)
    })
})

const port = process.env.port || 3001
app.listen(port, () => {
    console.log('Server up! 🪄')
    console.log('http://localhost:3001')
    console.log('http://localhost:3001/api/persons')
})