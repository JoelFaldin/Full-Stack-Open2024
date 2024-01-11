const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGO_URL

console.log('Connecting to: ', url)

mongoose.connect(url)
    .then(() => {
        console.log('Succesfully connected to MongoDB!', '🍃')
    })
    .catch(error => {
        console.error('Error connecting to the db.', error)
    })

const schema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        validate: {
            validator: function(v) {
                return /\d{2,3}-\d{4,}/.test(v)
            }
        },
        required: true
    }
})

schema.set('toJSON', {
    transform: (document, returned) => {
        returned.id = returned._id.toString()
        delete returned._id
        delete returned.__v
    }
})

module.exports = mongoose.model('Contact', schema)