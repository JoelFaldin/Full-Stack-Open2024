const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)