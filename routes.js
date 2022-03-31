const express = require('express')
const router = express.Router()
const fs = require('fs')
const data = require('./todos.json')

// Edit todo
router.get('/todos/edit/:id', (req,res) =>{
  const id = parseInt(req.params.id);
  const index = data.users.findIndex((todos) => {
    return todos.id === id;
  })

  const todos = data.users.find((todos) => {
    return todos.id === id;
  });

  if (todos.completed === false) {
    data.users[index] = {
      ...data.users[index],
      completed: true
    };
    fs.writeFileSync('./todos.json', JSON.stringify(data))
  }
  res.redirect('/todos');

})

// Delete Todo
router.get('/todos/delete/:id', (req,res)=> {
  const id = parseInt(req.params.id)
  data.users = data.users.filter((todos) => {
    return todos.id !== id;
  })
  fs.writeFileSync('./todos.json', JSON.stringify(data))
  res.redirect('/todos');
})

// Selected todo 
router.get('/todos/:id', (req, res) => {
    console.log(req.params)
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    const parsedTodo = JSON.parse(todosStr).users
    let selectedTodo;
    for (let i = 0; i < parsedTodo.length; i++) {
      if (parsedTodo[i].id === parseInt(req.params.id)) {
        selectedTodo = parsedTodo[i]
        break;
      }
    }
    res.render('selectedTodo.ejs', { todos: selectedTodo })
  })

// list todo & post todo 
router.get('/todos-add', (req, res) => {
  res.render('todoAdd.ejs')
})

router.route('/todos')
  .get((req, res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    res.render('todos.ejs', { todos: JSON.parse(todosStr).users })
  })
  .post((req, res) => {
    const {userId, title, description, due_date, completed = false} = req.body;
    console.log(req.body);
    data.lastId ++;
    const newData = {
      userId,
      id: parseInt(data.lastId),
      title,
      description,
      due_date,
      completed:completed === "complete"
    }
    if(!userId || !title || !description || !due_date){
      res.status(201).json({
        status: "Error",
        message: "userId, title, description, duedate, completed is required",
        data: {},
      })
    } else{
        data.users.push(newData);
        fs.writeFileSync('./todos.json', JSON.stringify(data))
    }
    res.redirect('/todos');
  })
   


module.exports = router