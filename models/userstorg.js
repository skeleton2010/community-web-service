"use strict";

const db = require("./config/db");

class userstorge {
    static getuser(id) {
        return new promise((resolve, reject) => {
            const query = "SELECT * FROM user WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                else resolve(data[0]);
            });
        });
    }
}

module.exports = userstorge;