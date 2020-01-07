const express = require('express')

const Todo = require('../models/todo')


const router = express.Router()


//CREATE SINGLE TODO
router.post('/todo', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })
    try {
        const saveToDatabase = await todo.save()
        res.json(saveToDatabase)
    } catch (err) {
        res.json(err)
    }
})

//READ ALL TODO
router.get('/todo', async (req, res) => {
    try {
        const allTodos = await Todo.find()
        res.json(allTodos)
    } catch (err) {
        res.json()
    }
})

//UPDATE SINGLE TODO
router.patch('/todo/:todoId', async (req, res) => {
    try {
        const singlePost = await Todo.updateOne({
            _id: req.params.todoId
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description
            }
        })
        res.json(singlePost)
    } catch (err) {
        res.json(err)
    }
})

//DELETE SINGLE TODO
router.delete('/todo/:todoId', async (req, res) => {
    try {
        const singleTodo = await Todo.remove({
            _id: req.params.todoId
        })
        res.json(singleTodo)
    } catch (err) {
        res.json(err)
    }
})


module.exports = router