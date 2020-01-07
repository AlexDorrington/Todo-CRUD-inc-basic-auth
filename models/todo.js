const mongoose = require('mongoose')


const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true
    }
})


module.exports = mongoose.model('Todos', TodoSchema)