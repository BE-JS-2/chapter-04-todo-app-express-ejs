const router = require('express').Router();
const fs     = require('fs');

const controller = require('../controller/todoController');

router.get('/', controller.getAll);
router.get('/:id', controller.getDetails);
router.get('/delete/:id', controller.deleteTodo);
router.get('/edit/:id', controller.editTodoView)

router.post('/', controller.addTodo);
router.post('/:id', controller.editTodo)


module.exports = router;