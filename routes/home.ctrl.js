"use strict";

const User = require("../models/user");

const output = {

}

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
}

module.exports = {
    process,
    output,
}
