const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('enter a password please!')
    process.exit(1)
}

const pass = process.argv[2]

const url = `mongodb+srv://joelfaldin:${pass}@cluster0.6ounrxy.mongodb.net/phonebook-db?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const schema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', schema)

// Function to get all existing entries:
const getData = () => {
    Contact.find({}).then(res => {
        res.forEach(phone => {
            console.log(phone.name, phone.number)
        })
        mongoose.connection.close()
    })
}

// Making a new contact for the phonebook:
const addContact = () => {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4],
    })
    contact.save().then(res => {
        console.log(`Added '${process.argv[3]}' number '${process.argv[4]}' to the phonebook!`)
        mongoose.connection.close()
    })
}

if (process.argv.length === 3) {
    console.log('phonebook:')
    getData()
} else if (process.argv.length === 5) {
    addContact()
} else {
    mongoose.connection.close()
}