const express = require('express')
const router = express.Router()
const fs = require('fs');



router.route('/todos')
    .get((req,res) => {
        const todosStr = fs.readFileSync('./todos.json','utf-8')
        res.render('todos.ejs',{todos: JSON.parse(todosStr)})
    })
    .post((req,res)=> {
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

    })



router.get('/todos/:id', (req,res) => {
        console.log(req.params)
        const todosStr = fs.readFileSync('./todos.json','utf-8')
        // console.log(todosStr);
        const parsedTodos = JSON.parse(todosStr)
        // console.log(parsedTodos.length);
        let selectedTodos;
        for(let i = 0; i < parsedTodos.length; i++) {
            if(parsedTodos[i].id == req.params.id) {
                selectedTodos = parsedTodos[i]
                break;
            }
        }
    //   console.log(selectedTodos);
      res.render('selectedTodos.ejs', { todos: selectedTodos })
    })

   

router.get('/todos.add', (req,res) => {
    res.render('todosAdd.ejs')
})

router.get('/todos/edit/:id',(req,res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
  const parsedTodos = JSON.parse(todosStr)
//   console.log(parsedTodos);
let selectedTodos;
  for (let i = 0; i < parsedTodos.length; i++) {
    if (parsedTodos[i].id == req.params.id) {
      parsedTodos[i].completed=true
      break;
    }
  }
  console.log(selectedTodos)
fs.writeFileSync('./todos.json', JSON.stringify(parsedTodos))
res.redirect('/todos')
})



router.post('/todos/delete/:id', (req,res) => {
    const todosStr = fs.readFileSync('./todos.json', 'utf-8')
    const parsedTodos = JSON.parse(todosStr)
    console.log(parsedTodos);
 
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





module.exports = router