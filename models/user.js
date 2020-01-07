const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 5
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    }
})

module.exports = mongoose.model('User', userSchema)