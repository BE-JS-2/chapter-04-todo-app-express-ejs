const express = require('express')
const router = express.Router()
const todoHandler = require('./handler/handler');

router.get('/todos-add', (req, res) => {
    res.render('todos-add.ejs')
  })
router.get('/todos/:id', todoHandler.getTodos)
router.put('/todos/edit/:id', todoHandler.editTodos)
router.delete('/todos/delete/:id', todoHandler.deleteTodos)
router.get('/todos', todoHandler.getAllTodos)
router.post("/todos", todoHandler.postTodo)

module.exports = router