const express = require('express');
const router  = require('./router');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use('/todos', router);

app.listen(3002, () => {
  console.log("Server running");
})