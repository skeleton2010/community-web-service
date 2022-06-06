"use strict";

const id = document.querySelector("#id"),
    pw = document.querySelector("#pw"),
    loginbtn = document.querySelector("button");

loginbtn.addEventListener("click", login);

function login() {
    const req ={
        id: id.value,
        pw: pw.value,
    };
    fetch('/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.admin) {
            location.href = '/admin';
        } else if (res.success) {
            location.href = '/';
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error(new Error('로그인중 error발생'));
    });
}