const fs = require("fs");

const loadTodos = () => {
  const file = fs.readFileSync("./todos.json", "utf-8");
  const todos = JSON.parse(file);
  return todos;
};

const saveTodos = (todos) => {
  fs.writeFileSync("./todos.json", JSON.stringify(todos));
};

const findTodo = (id) => {
  const todos = loadTodos();
  let myTodo;
  todos.forEach((todo) => {
    if (todo.id === +id) myTodo = todo;
  });
  return myTodo;
};

const addTodo = (form) => {
  const todos = loadTodos();
  todos.push(form);
  fs.writeFileSync("./todos.json", JSON.stringify(todos));
};

const generateId = () => {
  const todos = loadTodos();
  return todos[todos.length - 1].id + 1;
};

const updateTodo = (id) => {
  const todos = loadTodos();
  const todo = findTodo(id);
  let myIndex;
  todos.forEach((todo, index) => {
    if (todo.id === +id) {
      myIndex = index;
    }
  });
  todo.completed = true;
  todos[myIndex] = todo;
  saveTodos(todos);
};

const deleteTodo = (id) => {
  const todos = loadTodos();
  const todo = findTodo(id);
  let myTodo, myIndex;
  todos.forEach((todo, index) => {
    if (todo.id === +id) {
      myTodo = todo;
      myIndex = index;
    }
  });
  todos.splice(myIndex, 1);
  saveTodos(todos);
};

module.exports = {
  loadTodos,
  findTodo,
  addTodo,
  generateId,
  updateTodo,
  deleteTodo,
};
