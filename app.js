const path = require("path");
const express = require("express");
const port = 3000;

const todosRoutes = require("./routes/todos");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use(todosRoutes);

// handled error routes
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(port);
