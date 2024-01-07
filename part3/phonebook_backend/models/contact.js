const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL

console.log('Connecting to: ', url)

mongoose.connect(url)
    .then(result => {
        console.log('Succesfully connected to MongoDB!', '🍃')
    })
    .catch(error => {
        console.error('Error connecting to the db.', error)
    })

const schema = mongoose.Schema({
    name: String,
    number: String
})

schema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model('Contact', schema)