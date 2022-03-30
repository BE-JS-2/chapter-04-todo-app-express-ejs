const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "todos.json");

const getTodosFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Todo {
  constructor(userId, id, title, description, due_date, completed) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.description = description;
    this.due_date = due_date;
    this.completed = completed;
  }

  static fetchAll(cb) {
    getTodosFromFile(cb);
  }

  static findById(id, cb) {
    getTodosFromFile((todos) => {
      const todo = todos.find((t) => t.id === id);
      cb(todo);
    });
  }

  save() {
    getTodosFromFile((todos) => {
      let todoId;
      if (this.id === null) {
        todoId = 1;
      }
      todos.forEach((todo) => {
        todoId = todo.id + 1;
      });

      this.id = todoId;
      this.userId = 1;
      this.completed = false;

      todos.push(this);
      fs.writeFile(p, JSON.stringify(todos), (err) => {
        console.log(err);
      });
    });
  }

  static updated(id) {
    getTodosFromFile((todos) => {
      const existingTodoIndex = todos.findIndex((todo) => todo.id === id);
      const updatedTodos = [...todos];
      if (!updatedTodos[existingTodoIndex].completed) {
        updatedTodos[existingTodoIndex].completed = true;
      }
      fs.writeFile(p, JSON.stringify(updatedTodos), (err) => {
        console.log(err);
      });
    });
  }

  static delete(id) {
    getTodosFromFile((todos) => {
      const updatedTodos = todos.filter((todo) => todo.id !== id);

      fs.writeFile(p, JSON.stringify(updatedTodos), (err) => {
        console.log(err);
      });
    });
  }
};
