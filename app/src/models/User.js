"use strict";

const UserStorge = require("./UserStorge");

class User {
    constructor(body) {
        this.body = body;
    }
    login() {
        const body = this.body;
        const {id, pw} = UserStorge.getUserInfo(body.id);
        if (id) {
            /* if (id === process.env.ID_SKELETON || id === process.env.ID_ADMIN && pw === body.pw) {
                return { admin: true};
            } else  */if (id === body.id && pw === body.pw) {
                return { success: true};
            }
            return { success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    }
}

module.exports = User;