var express = require("express");
var router = express.Router();
const { loadTodos } = require("../utils/todos");

/* GET home page. */
router.get("/", function (req, res, next) {
  const todos = loadTodos();
  res.render("todos", {
    layout: "layouts/dashboard",
    title: "Todo List",
    todos,
    msg: req.flash("msg"),
  });
});

module.exports = router;
