const fs = require("fs");

fs.readdir('./data', (err, list) => {
    console.log(list);
});