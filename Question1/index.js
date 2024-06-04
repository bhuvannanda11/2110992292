//Requiring packages

require('dotenv').config()

const express = require("express");

const categoriesRoute = require("./categories/categories");

const app = express();

app.use(express.json());

app.use("/", categoriesRoute);

module.exports = app;