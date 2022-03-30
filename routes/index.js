var express = require("express");
var router = express.Router();
const { loadTodos } = require("../utils/todos");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/todos");
});

module.exports = router;
