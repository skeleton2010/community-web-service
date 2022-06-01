"use strict";

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.set('views', "./src/views");
app.set('view engine', 'ejs');

const home = require('./src/routes/home/index');
app.use(express.static((`${__dirname}/src/public`)))
app.use("/", home);

module.exports = app;