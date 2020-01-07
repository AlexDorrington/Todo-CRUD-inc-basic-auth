const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const path = require('path')


//GRAB THE EXPRESS OBJECT
const app = express()


//MIDDLEWARE TO PARSE DATA TO JSON EACH TIME A CRUD ROUTE USED
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


//CONNECT TO MONGODB DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/Practice2', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to database Practice2')
})


//IMPORT ROUTES
const todosRoute = require('./routes/todoOps')
const authRoute = require('./routes/auth')

app.use('/', todosRoute)
app.use('/', authRoute)
app.use(express.static('views'))


//RENDER HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/register.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/register.html'))
})

app.get('/use', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/todo.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/login.html'))
})

app.get('*', (req, res) => {
    res.send('Error')
})



//START SERVER
app.listen(3000, () => {
    console.log('Server running')
})