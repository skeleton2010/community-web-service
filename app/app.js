"use strict";

//모듈
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const home = require("./src/routes/home");

//앱셋팅
app.set("views", "./src/views");    
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extends: true}));
app.use("/", home);

module.exports = app;
