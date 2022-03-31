const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => res.redirect("/todos"));

router.get("/add_todo", (req, res) => res.render("add_todo.ejs"));
 
router 
  .route("/todos")
  .get((req, res) => {
    const todosData = fs.readFileSync("./todos.json", "utf-8");
    res.render("todo_list.ejs", { todos: JSON.parse(todosData) });
  })
  .post((req, res) => {
    const todosData = fs.readFileSync("./todos.json", "utf-8");
    const parsedTodos = JSON.parse(todosData);
    let lastTodo = parsedTodos[parsedTodos.length - 1];
    let { userId, id } = lastTodo;
    const { title, description, due_date } = req.body;
    parsedTodos.push({
      userId, // contoh 1
      id: ++id,
      title,
      description,
      due_date,
      completed: false,
    });
    fs.writeFileSync("./todos.json", JSON.stringify(parsedTodos));
    res.redirect("/todos");
  });

router.get("/todos/:id", (req, res) => {
  const todosData = fs.readFileSync("./todos.json", "utf-8");
  const parsedTodos = JSON.parse(todosData);
  const { id } = req.params;
  res.render("todo_detail.ejs", {
    todo: parsedTodos.filter((todo) => todo.id === Number(id))[0],
  });
}); 

router.post("/update_todo/:id", (req, res) => {
  const todosData = fs.readFileSync("./todos.json", "utf-8");
  const parsedTodos = JSON.parse(todosData);
  const { id } = req.params;
  const { userId, title, description, due_date} = req.body;
  const index = parsedTodos.findIndex((todo) => todo.id === Number(id));
  parsedTodos[index] = {
      userId : Number(userId), 
      id : Number(id),
      title,
      description,
      due_date,
      completed: true
  };
  fs.writeFileSync("./todos.json", JSON.stringify(parsedTodos));
  res.redirect("/todos");
});

router.post("/delete_todo/:id", (req, res) => {
  const todosData = fs.readFileSync("./todos.json", "utf-8");
  const parsedTodos = JSON.parse(todosData);
  const { id } = req.params;
  const index = parsedTodos.findIndex((todo) => todo.id === Number(id));
  if (index !== -1) {
    parsedTodos.splice(index, 1);
    fs.writeFileSync("./todos.json", JSON.stringify(parsedTodos));
  } else {
    res.json({
      message: "Gagal menghapus",
    });
  }
  res.redirect("/todos");
});

module.exports = router;
