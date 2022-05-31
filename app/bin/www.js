"use strict";

const app = require('../server');
const port = process.env.ServerPort || 5000;

app.listen(port, () =>{
    console.log(`${port}번 포트에서 service open`);
});