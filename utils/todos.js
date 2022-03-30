require("dotenv").config();
const fs = require("fs");

const { TODO_DIR_PATH, TODO_FILE_NAME } = process.env;
const DATA_PATH = TODO_DIR_PATH + "/" + TODO_FILE_NAME;

if (!fs.existsSync(TODO_DIR_PATH)) {
  fs.mkdirSync(TODO_DIR_PATH);
}
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, "[]", "utf8");
}

const loadTodos = () => {
  const FileBuffer = fs.readFileSync(DATA_PATH, "utf-8");
  const todos = JSON.parse(FileBuffer);
  return todos;
};

const detailTodoByID = (id) => {
  const todos = loadTodos();
  return todos.find((todo) => todo.id == id);
};

const saveTodos = (todos) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(todos, 0, 4), "utf8");
};

const addTodo = (todo) => {
  const todos = loadTodos();
  todos.push(todo);
  saveTodos(todos);
};

const isDuplicate = (id) => {
  const todos = loadTodos();
  return todos.some((todo) => todo.id === id);
};

const setCompleted = (todoID) => {
  const todos = loadTodos();
  todos.forEach((todo) => {
    if (todo.id == todoID) {
      todo.completed = true;
    }
  });
  saveTodos(todos);
};

const deleteTodo = (todoID) => {
  console.log(todoID);
  const todos = loadTodos();
  const newTodos = todos.filter((todo) => todo.id != todoID);
  saveTodos(newTodos);
};

const generateID = () => {
  const todos = loadTodos();
  return Number(todos[todos.length - 1].id) + 1;
};

module.exports = {
  loadTodos,
  detailTodoByID,
  addTodo,
  isDuplicate,
  setCompleted,
  deleteTodo,
  generateID,
};
