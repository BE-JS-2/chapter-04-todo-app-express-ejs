const { Router } = require('express');
const todoController = require('./controller/todoController');
const router = Router();

router.get("/todos", todoController.getTodos);

router.get("/todos/:id", todoController.getDetailTodo);

router.get("/add-data", todoController.getAddData);

router.post("/todos", todoController.postAddData);

router.put("/todos/:id", todoController.putUpdateTodo);

router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;