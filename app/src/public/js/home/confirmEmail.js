"use strict";

const nodemailer = require("nodemailer");

//{const email = document.querySelector("#email"),
//    emailBtn = document.querySelector("#button");

//emailBtn.addEventListener("click", confirmEmail);
//}

//const mail = {
    //email: email.value,
//}

const transport = nodemailer.createTransport({
    service: 'gmail, naver',
});

const mailOptons = {
    from: 'serverspport@gmail.com',
    to: "inseong747@gmail.com",
    subject: 'test',
    text: 'adadad',
}

transport.sendMail(mailOptons, (err, info) => {
    if(err) {
        console.log(err);
    } else {
        console.log("1" + info.response);
    }
});