const express = require("express");
const path = require("path");

const routes = express.Router()

routes.get("/*", (req, res) => {
    res.sendFile(path.resolve("frontend", "index.html"));
})

module.exports = routes