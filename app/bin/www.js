"use strict";

const app = require("../app")
const logger = require("../src/config/logger");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`${PORT}번포트 에서 service open`);
}); 