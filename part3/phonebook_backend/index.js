const express = require('express')
const app = express()

app.use(express.json())

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello there!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
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
    const newId = Math.random() * 1000
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'Name missing!'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'Number missing!'
        })
    } else if (phonebook.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'Person already added!'
        })
    }
    
    const contact = {
        "id": newId,
        "name": body.name,
        "number": body.number
    }

    phonebook.concat(contact)

    res.json(contact)
})

const port = 3001
app.listen(port, () => {
    console.log('Server up! 🪄')
    console.log('http://localhost:3001')
    console.log('http://localhost:3001/api/persons')
})