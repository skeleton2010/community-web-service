"use strict";

const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.set('views', "./views");
app.set('view engine', 'ejs');

const home = require('./routes/home/index');
app.use("/", home);

module.exports = app;