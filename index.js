const express = require('express')
const app = express()
const port = 3000
const todoRoute = require('./route.js')

// middleware
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use('/', todoRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})