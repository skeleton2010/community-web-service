"use strict";

const output = {
    home: (req, res) =>{
        res.render("home/index");
    },
    login: (req, res) =>{
        res.render("home/login");
    },
};

const process = {
    login: (req, res) => {
    },
};



module.exports = {
    output,
    process,
};