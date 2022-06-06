"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/login', ctrl.output.login);
router.get('/admin', ctrl.output.admin);

router.post('/login', ctrl.process.login);

module.exports = router;