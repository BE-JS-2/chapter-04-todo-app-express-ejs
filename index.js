const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.use(express.urlencoded({
  extended: false
}))
app.set('view engine', 'ejs')


app.get('/todos', (req, res) => {
  const todos = fs.readFileSync('./todos.json', 'utf-8')
  res.render('index.ejs', {
    todos: JSON.parse(todos)
  })
})

app.get('/todos/add', (req, res) => {
  res.render('add.ejs')
})

app.get('/todos/:id', (req, res) => {
  const todos = fs.readFileSync('./todos.json', 'utf-8')
  const jsonTodos = JSON.parse(todos)
  let todo;
  for (let i = 0; i < jsonTodos.length; i++) {
    if (jsonTodos[i].id == req.params.id) {
      todo = jsonTodos[i]
      break;
    }
  }
  res.render('detail.ejs', {
    todos: todo
  })
})



app.post('/todos', (req, res) => {
  const todos = fs.readFileSync('./todos.json', 'utf-8')
  const jsonTodos = JSON.parse(todos)
  jsonTodos.push(req.body)
  fs.writeFileSync('./todos.json', JSON.stringify(jsonTodos))
  res.redirect('/todos')
})


app.get('/todos/edit/:id', (req, res) => {
  const todos = fs.readFileSync('./todos.json', 'utf-8')
  const jsonTodos = JSON.parse(todos)
  let todo;
  for (let i = 0; i < jsonTodos.length; i++) {
    if (jsonTodos[i].id == req.params.id) {
      jsonTodos[i].completed = true
      break;
    }
  }
  fs.writeFileSync('./todos.json', JSON.stringify(jsonTodos))
  res.redirect('/todos')
})

app.post('/todos/delete/:id', (req, res) => {
  const todos = fs.readFileSync('./todos.json', 'utf-8')
  const jsonTodos = JSON.parse(todos)
  for (let i = 0; i < jsonTodos.length; i++) {
    if (jsonTodos[i].id == req.params.id) {
      jsonTodos.splice(i, 1)
      break;
    }
  }
  fs.writeFileSync('./todos.json', JSON.stringify(jsonTodos))
  res.redirect('/todos')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})