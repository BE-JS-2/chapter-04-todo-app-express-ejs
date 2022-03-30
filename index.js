const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = 3000;
const {
  loadTodos,
  findTodo,
  addTodo,
  generateId,
  updateTodo,
  deleteTodo,
} = require("./operations.js");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(expressLayouts);

const data = {
  layout: "master",
};
app.get("/", (req, res) => {
  data.tittle = "TODO App";
  res.render("index", data);
});

app
  .route("/todos")
  .get((req, res) => {
    data.tittle = "My TODO";
    data.todos = loadTodos();
    res.render("todos", data);
  })
  .post((req, res) => {
    let genId = generateId();
    form = {
      userId: Number(req.body.userid),
      id: genId,
      title: req.body.title,
      description: req.body.desc,
      due_date: req.body.due_date,
      completed: Boolean(req.body.completed),
    };
    addTodo(form);
    res.redirect("/todos");
  });
app.post("/todos/edit", (req, res) => {
  updateTodo(req.body.id);
  res.redirect("/todos");
});
app.post("/todos/delete", (req, res) => {
  deleteTodo(req.body.id);
  res.redirect("/todos");
});
app.get("/add-todos", (req, res) => {
  data.tittle = "Add TODO";
  res.render("add-todo", data);
});

app.route("/todos/:id").get((req, res) => {
  data.tittle = "Detail TODO";
  data.todo = findTodo(req.params.id);
  res.send(res.render("detail-todo", data));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
