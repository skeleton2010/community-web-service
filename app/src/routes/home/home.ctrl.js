"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {
    home: (req, res) =>{
        logger.info(`GET / 304 "홈 화면으로이동"`);
        res.render("home/index");
    },
    login: (req, res) =>{
        logger.info(`GET /login 304 "로그인 화면으로이동"`);
        res.render("home/login");
    },
    admin: (req, res) => {
        logger.info(`GET /admin 304 "관리자 화면으로이동"`);
        res.render('home/admin');
    },
    email: (req, res) => {
        res.render('home/email');
    },
    register: (req, res) =>{
        logger.info(`GET /register 304 "회원가입 화면으로이동"`);
        res.render('home/register');
    }
};

const process = {
    login: async(req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    }
};



module.exports = {
    output,
    process,
};