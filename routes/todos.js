const express = require("express");

const todosController = require("../controllers/todos");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/todos");
});

router.get("/todos", todosController.getTodos);

router.get("/todos/:id", todosController.getTodo);

router.get("/add-todo", todosController.getAddTodo);

router.post("/todos", todosController.postAddTodo);

router.post("/todos/:id", todosController.updateTodo);

router.post("/todos/delete/:id", todosController.deleteTodo);

module.exports = router;
