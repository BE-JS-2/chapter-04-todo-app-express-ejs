const express = require('express')
const router = express.Router()
const fs = require('fs')

router.route('/todos')
  .get((req, res) => {
    const dataTodos = fs.readFileSync('./todos.json', 'utf-8')
    const listData = JSON.parse(dataTodos)
    res.render('todos.ejs', {list : listData} )
  })
  .post((req, res) => {
    const dataTodos = fs.readFileSync('./todos.json', 'utf-8')
    const parsTodo = JSON.parse(dataTodos)
    
    parsTodo.push(req.body)
    fs.writeFileSync('./todos.json', JSON.stringify(parsTodo))
    res.redirect('/todos')
  })

router.get('/Add', (req, res) => {
    res.render('addData.ejs')
  })

router.get('/todos/:id',(req, res) => {
    console.log(req.params.id)
    const dataTodos = fs.readFileSync('./todos.json', 'utf-8')
    const listData = JSON.parse(dataTodos)
    let selectedTitle;
    for (let i = 0; i < listData.length; i++) {
        if (listData[i].id == req.params.id) {
          selectedTitle = listData[i]
          break;
        }
    }
    res.render('todosId.ejs', { list: selectedTitle })
}) 

router.get('/todos-edit/:id',(req, res) => {
  console.log(req.params.id)
  const dataTodos = fs.readFileSync('./todos.json', 'utf-8')
  const listData = JSON.parse(dataTodos)
  let selectedCompleted;
  for (let i = 0; i < listData.length; i++) {
      if (listData[i].id == req.params.id) {
        listData[i].completed = true
        break;
      }
  }
  fs.writeFileSync('./todos.json', JSON.stringify(listData))
  res.redirect('/todos')
}) 

router.post('/todos-delete/:id',(req, res) => {
  console.log(req.params.id)
  const dataTodos = fs.readFileSync('./todos.json', 'utf-8')
  const listData = JSON.parse(dataTodos)
  for (let i = 0; i < listData.length; i++) {
      if (listData[i].id == req.params.id) {
        listData.splice(i,1)
        break;
      }
  }
  fs.writeFileSync('./todos.json', JSON.stringify(listData))
  res.redirect('/todos')
}) 

module.exports = router