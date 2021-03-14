const express = require("express");
const path = require("path")
const api_routes = require(path.resolve(__dirname, "api", "routes.js"))
const frontend_routes = require(path.resolve(__dirname, "frontend", "routes.js"))

const routes = express.Router()

routes.use("/api", api_routes)
routes.use("/", frontend_routes)

module.exports = routes