const express = require('express');
const app = express()
const PORT = 6996;
const todo_router = require('./routes');

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use('/', todo_router);


app.listen(PORT, ()=> console.log(`Server berjalan pada port ${PORT}`));