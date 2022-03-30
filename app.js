const express = require("express");
const routes = require("./routes");
const methodOverride = require("method-override");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use(routes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})