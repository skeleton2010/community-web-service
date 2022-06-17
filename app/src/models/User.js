"use strict"

const UserStorge = require("./UserStorge");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        try {
        const user = await UserStorge.getUserInfo(this.body.id);
        if (user) {
            if(this.body.id === 'skeleton' || this.body.id === 'admin') {
                if (user.pw === this.body.pw) {
                    return {admin: true};
                }
            } else if (user.id === this.body.id && user.pw === this.body.pw) {
                return { success: true};
            }
            return { success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return { success: false, msg: "존재하지 않는 아이디입니다."};
    } catch (err) {
        return { success: false, err};
    }
}
    async register() {
        try {
        const response = await UserStorge.save(this.body);
        return response, {success: true};
        } catch (err) {
            return { success: false, err};
        };
    }
}

module.exports = User;