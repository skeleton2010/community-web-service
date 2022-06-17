"use strict";

const db = require("../config/db");

class UserStorge {
    //static getUser(...fields) {
    //}

    static getUserInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        }); 
    }

    static async save(usersInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO users(id, email, pw) VALUES(?,?,?);";
            db.query(query, [usersInfo.id, usersInfo.email, usersInfo.pw], (err) => {
                if (err) reject(`${err}`);
                resolve({ successs: true });
            });
        });
    }
}

module.exports = UserStorge;
