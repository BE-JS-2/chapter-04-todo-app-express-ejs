const express = require('express')
const app = express()
const port = 3000
const todosRoutes = require('./routes.js')

app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')

app.use('/', todosRoutes)

app.listen(port, () => {
    console.log(`Listen Port ${port}`)
})