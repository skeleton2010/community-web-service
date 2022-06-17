"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.crtl")

router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/ForgetPassword", ctrl.output.forgetpassword);
router.get("/confirmEmail", ctrl.output.confirmEmail);
router.get("/community", ctrl.output.community);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/confirmEmail", ctrl.process.confirmEmail);

module.exports = router;