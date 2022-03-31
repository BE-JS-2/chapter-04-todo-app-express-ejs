const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')


// middleware
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('hello')
})


app.get('/todos',(req, res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    res.render('todos.ejs', { todos: JSON.parse(todosStr) })
})
  

app.get('/todos/:id', (req, res) => {
  console.log(req.params)
  const todosStr = fs.readFileSync('./todos.json', 'utf-8')
  const parsedTodos = JSON.parse(todosStr)
  let selectedTodos;
  for (let i = 0; i < parsedTodos.length; i++) {
    if (parsedTodos[i].id == req.params.id) {
      selectedTodos = parsedTodos[i]
      break;
    }
  }
  res.render('selectedTodos.ejs', { todos: selectedTodos })
})
app.get('/todos-add', (req, res) => {
  res.render('todosAdd.ejs')
})
app.post('/todos',(req, res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    const parsedTodos = JSON.parse(todosStr)
  parsedTodos.push(req.body)
  console.log(req.body)
    fs.writeFileSync('./todos.json', JSON.stringify(parsedTodos))
    res.redirect('/todos')
})


app.get('/todos-edit/:id', (req, res) => {
  const todosStr = fs.readFileSync('./todos.json', 'utf-8')
  const parsedTodos = JSON.parse(todosStr)
  let selectedTodos;
  for (let i = 0; i < parsedTodos.length; i++) {
    if (parsedTodos[i].id == req.params.id) {
      parsedTodos[i].completed=true
      break;
    }
  }
  console.log(parsedTodos)
fs.writeFileSync('./todos.json', JSON.stringify(parsedTodos))
res.redirect('/todos')
})

app.post('/todos-delete/:id', (req, res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
  const parsedTodos = JSON.parse(todosStr)
  let selectedTodos;
  for (let i = 0; i < parsedTodos.length; i++) {
    if (parsedTodos[i].id == req.params.id) {
      parsedTodos.splice(i,1)
      break;
    }
  }
  console.log(parsedTodos)
fs.writeFileSync('./todos.json', JSON.stringify(parsedTodos))
res.redirect('/todos')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})