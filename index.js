const express = require('express')
const app = express()
const port = 8080
const todoRoutes = require('./routes.js')

// middleware
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use('/', todoRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})