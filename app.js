const express = require("express");
const path = require("path");
const routes = require(path.resolve(__dirname, "routes.js"))

const app = express();
app.set('view engine', 'ejs')
const port = 5000

/* Ensure any requests prefixed with /static will serve our "frontend/static" directory */
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.use("/", routes)
app.listen(process.env.PORT || port, () => console.log("Server running..."));
