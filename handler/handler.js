const fs = require("fs");

exports.getTodos=(req, res) =>{
    console.log("bolo",req.params)
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    const parsedTodo = JSON.parse(todosStr)
    let selectedTodo;
    for (let i = 0; i < parsedTodo.length; i++) {
      if (parsedTodo[i].id == req.params.id) {
        selectedTodo = parsedTodo[i]
        break;
      }
    }
    res.render('../views/selectedTodo.ejs', { todos: selectedTodo })
}


exports.getAllTodos=(req, res) =>{
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    res.render('todos.ejs', { todos: JSON.parse(todosStr) })
}

exports.deleteTodos=(req, res) =>{
  const todoId = req.params.id;
  const todos = JSON.parse(fs.readFileSync("./todos.json", "utf-8"));
  const filterTodos = todos.filter(todo => todo.id != todoId);
  fs.writeFileSync("./todos.json", JSON.stringify(filterTodos));
  res.redirect('/todos')
  this.postTodo(req, res)
}

exports.postTodo=(req, res) =>{
  const userId = req.body.userId;
  const title = req.body.title;
  const description = req.body.description;
  const due_date = req.body.due_date;
  const completed = req.body.completed === "true";
  const todosStr = fs.readFileSync('./todos.json', 'utf-8')
  const parsedTodo = JSON.parse(todosStr)
  parsedTodo.push({
    userId: userId,
    id: parsedTodo.length + 1,
    title: title,
    description: description,
    due_date: due_date,
    completed: completed
})
  fs.writeFileSync('./todos.json', JSON.stringify(parsedTodo))
  res.redirect('/todos')
}

exports.editTodos=(req, res) =>{
  const todoId = req.params.id;
    const todosStr = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    const indexTodo = todosStr.findIndex(todo => todo.id == todoId);
    if (!todosStr[indexTodo].completed) {
        todosStr[indexTodo].completed = true;
    }
    fs.writeFileSync("./todos.json", JSON.stringify(todosStr));
    res.redirect("/todos");
}

