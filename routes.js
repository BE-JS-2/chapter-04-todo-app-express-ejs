const express = require('express')
const { route } = require('express/lib/application')
const router = express.Router()
const fs = require('fs')
const data = require('./todos.json')

// middleware that is specific to this router
router.get('/todo-add', (req, res) => {
  res.render('todoAdd.ejs')
})

router.get('/todo/:id', (req, res) => {
  console.log(req.params)
  const todoStr = fs.readFileSync('./todos.json', 'utf-8')
  const parsedtodo = JSON.parse(todoStr).users
  let selectedtodo;
  for (let i = 0; i < parsedtodo.length; i++) {
    if (parsedtodo[i].id === parseInt(req.params.id)) {
      selectedtodo = parsedtodo[i]
      break;
    }
  }
  res.render('selectedTodo.ejs', { todo: selectedtodo })

})

router.route('/todo')
  .get((req, res) => {
    const todoStr = fs.readFileSync('./todos.json', 'utf-8')
    res.render('todo.ejs', { todo: JSON.parse(todoStr).users })
  })
  
  .post((req, res)=> {
    const {userId, title, description, duedate, completed=false} = req.body;
    console.log(req.body)
    data.last_id++;
    const newData = {
      id: parseInt(data.last_id),
      userId,
      title,
      description,
      duedate,
      completed:completed === "complete"
    }
    
    if(!userId || !title || !description || !duedate){
      res.status(201).json({
        status: "Error",
        message: "userId, title, description, duedate, completed is required",
        data: {},
      })
    } 
    // else{
    //     res.status(200).json({
    //       status:"Success",
    //       message: "Data created",
    //       data: newData,
    //     })
        data.users.push(newData);
        fs.writeFileSync('./todos.json', JSON.stringify(data))
        res.redirect('/todo');
    // }
    res.redirect('/todo');
  })

  router.get('/todo/delete/:id', (req,res)=> {
    const id = parseInt(req.params.id)
    data.users = data.users.filter((todo) => {
      return todo.id !== id;
    })
    fs.writeFileSync('./todos.json', JSON.stringify(data))
    res.redirect('/todo');
  })

  router.get('/todo/edit/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const index = data.users.findIndex((todo) => {
      return todo.id === id;
    })

    const todo = data.users.find((todo) => {
      return todo.id === id;
    });

    if (todo.completed === false) {
      data.users[index] = {
        ...data.users[index],
        completed: true
      };
      fs.writeFileSync('./todos.json', JSON.stringify(data))
    }
    res.redirect('/todo');

  })
module.exports = router