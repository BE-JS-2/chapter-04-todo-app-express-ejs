const Todo = require("../models/todo");

exports.getTodos = (req, res, next) => {
  Todo.fetchAll((todos) => {
    res.render("todos", {
      todos,
      pageTitle: "Todos",
    });
  });
};

exports.getTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.findById(+id, (todo) => {
    res.render("todo-detail", {
      todo,
      pageTitle: "Detail Todo",
    });
  });
};

exports.getAddTodo = (req, res, next) => {
  res.render("add-todo", {
    pageTitle: "Add Todo",
  });
};

exports.postAddTodo = (req, res, next) => {
  const { title, description, due_date } = req.body;

  const todo = new Todo(null, null, title, description, due_date, null);
  todo.save();
  res.redirect("/todos");
};

exports.updateTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.updated(+id);
  res.redirect("/todos");
};

exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.delete(+id);
  res.redirect("/todos");
};
