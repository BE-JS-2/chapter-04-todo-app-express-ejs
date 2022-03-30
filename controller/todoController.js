const fs = require("fs");

exports.getTodos = (req, res, next) => {
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));
    res.render('todos', {
        pageTitle: "Todos",
        todos: todos
    })
}

exports.getDetailTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    const detailTodo = todos.filter(todo => todo.id == todoId);
    res.render("detailTodo", {
        pageTitle: "Detail Todo",
        detailTodo: detailTodo
    })
}

exports.getAddData = (req, res, next) => {
    res.render("addData", {
        pageTitle: "Add Data"
    });
}

exports.postAddData = (req, res, next) => {
    const userId = req.body.userId;
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const due_date = req.body.due_date;
    const completed = req.body.completed === "true";
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    todos.push({
        userId: userId,
        id: id,
        title: title,
        description: description,
        due_date: due_date,
        completed: completed
    });
    fs.writeFileSync("todos.json", JSON.stringify(todos));
    res.redirect("/todos");
}

exports.postUpdateTodos = (req, res, next) => {
    const todoId = req.params.id;
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    const indexTodo = todos.findIndex(todo => todo.id == todoId);
    if (!todos[indexTodo].completed) {
        todos[indexTodo].completed = true;
    }
    fs.writeFileSync("todos.json", JSON.stringify(todos));
    res.redirect("/todos");
}

exports.postDeleteTodos = (req, res, next) => {
    const todoId = req.params.id;
    const todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));
    const filterTodos = todos.filter(todo => todo.id != todoId);
    fs.writeFileSync("todos.json", JSON.stringify(filterTodos));
    res.redirect("/todos");
}