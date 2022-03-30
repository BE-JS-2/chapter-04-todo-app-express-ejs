const express = require("express");
const router = express.Router();
const {
  loadTodos,
  detailTodoByID,
  addTodo,
  isDuplicate,
  setCompleted,
  deleteTodo,
  generateID,
} = require("../utils/todos");
const { body, validationResult, check } = require("express-validator");

router.get("/", function (req, res, next) {
  const todos = loadTodos();
  res.render("todos", {
    layout: "layouts/dashboard",
    title: "Todo List",
    todos,
    msg: req.flash("msg"),
  });
});

router.post(
  "/",
  [
    check("id").custom((value) => {
      if (isDuplicate(value)) {
        throw new Error("ID sudah terdaftar!");
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("todos-add", {
        title: "Add Todo",
        layout: "layouts/dashboard",
        errors: errors.array(),
      });
    } else {
      if (req.body.completed == "on") {
        req.body.completed = true;
      } else {
        req.body.completed = false;
      }
      addTodo(req.body);
      req.flash("msg", "Todo has been added!");
      res.redirect("/todos");
    }
  }
);

router.get("/add", (req, res, next) => {
  const generatedID = generateID();
  res.render("todos-add", {
    layout: "layouts/dashboard",
    title: "Add Todo",
    generatedID,
  });
});

router.get("/:id", (req, res, next) => {
  const todo = detailTodoByID(req.params.id);
  console.log("todo", todo);
  res.render("todos-detail", {
    layout: "layouts/dashboard",
    title: "Detail Todo",
    todo,
  });
});

router.get("/edit/:id", function (req, res, next) {
  setCompleted(req.params.id);
  req.flash("msg", "Todo has been completed!");
  res.redirect("/todos");
});

router.get("/delete/:id", (req, res) => {
  const todo = detailTodoByID(req.params.id);

  if (!todo) {
    res.status(404).send("Todo not found!");
  } else {
    deleteTodo(req.params.id);
    req.flash("msg", "Todo has been deleted!");
    res.redirect("/todos");
  }
});

module.exports = router;
