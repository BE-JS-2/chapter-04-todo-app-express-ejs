const express = require('express')
const router = express.Router()
const fs = require('fs');


router.route('/todos')
    .get((req, res) => {
        const todosStr = fs.readFileSync('./todos.json','utf-8')
        res.render('todos.ejs', {todos: JSON.parse(todosStr)})
    })
    .post((req, res) => {
        const todosStr = fs.readFileSync('./todos.json','utf-8')
        const parsedTodo = JSON.parse(todosStr)
        
        parsedTodo.push({
          userId: req.body.userId,
          id: parsedTodo.length + 1,
          title: req.body.title,
          description: req.body.description,
          due_date: req.body.due_date,
          completed: req.body.completed === "true"
        })
        
        fs.writeFileSync('./todos.json', JSON.stringify(parsedTodo))
        res.redirect('/todos')
    })

router.get('/todos/:id', (req,res) => {
    const todosStr = fs.readFileSync('./todos.json','utf-8')
    const parsedTodos = JSON.parse(todosStr)
    let detailTodos;
    
    for(let i = 0; i < parsedTodos.length; i++) {
        if(parsedTodos[i].id == req.params.id) {
            detailTodos = parsedTodos[i]
            break;
        }
    }
    
    res.render('detailTodos.ejs', { todos: detailTodos })
})

router.get('/todos.create', (req,res) => {
    res.render('addTodos.ejs')
})

router.get('/todos/edit/:id',(req,res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    const parsedTodos = JSON.parse(todosStr)
    
    for (let i = 0; i < parsedTodos.length; i++) {
        if (parsedTodos[i].id == req.params.id) {
            parsedTodos[i].completed=true
            break;
        }
    }
    
    fs.writeFileSync('./todos.json', JSON.stringify(parsedTodos))
    res.redirect('/todos')
})

router.post('/todos/delete/:id', (req,res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    const parsedTodos = JSON.parse(todosStr)
 
    for (let i = 0; i < parsedTodos.length; i++) {
      if (parsedTodos[i].id == req.params.id) {
        parsedTodos.splice(i,1)
        break;
      }
    }
    
    fs.writeFileSync('./todos.json', JSON.stringify(parsedTodos))
    res.redirect('/todos')
})


module.exports = router