const { Router } = require('express');
const todoController = require('./controller/todoController');
const router = Router();

router.get("/todos", todoController.getTodos);

router.get("/todos/:id", todoController.getDetailTodo);

router.get("/add-data", todoController.getAddData);

router.post("/todos", todoController.postAddData);

router.post("/todos/update/:id", todoController.postUpdateTodos);

router.post("/todos/delete/:id", todoController.postDeleteTodos);

module.exports = router;