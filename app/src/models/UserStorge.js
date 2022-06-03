"use strict";

class UserStorge {
    static #users = {
        id: ["skeleton", "admin", "guest"],
        email: ["skeleton", "admin", "guest"],
        pw: ['skeleton', 'admin', 'guest'],
    };

    static getusers(...args) {
        const users = this.#users;
        const newUsers = args.reduce((newUsers, args) => {
            if (users.hasOwnProperty(args)) {
                newUsers[args] = users[args];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const userInfo = Object.keys(users).reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }
}

module.exports = UserStorge;