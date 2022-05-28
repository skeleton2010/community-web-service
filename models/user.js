"use strict";

const userstorge = require("./userstorg");

class user {
    constructor(body) {
        this.body = body;
    }

    async login() {
        try {
            const user = await userstorge.login(this.body.id);
            if (user) {
                if (user.id === this.body.id && user.pw === this.body.pw) {
                    return { success: true};
                }
                return { success: false, msg: "비밀번호가틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디입니다."};
        } catch (err) {
            return { success: false, msg: err};
        }
    }
}

module.exports = user;