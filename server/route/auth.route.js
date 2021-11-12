
const express = require("express");
const router = express.Router();

const auth = require("../controller/auth.controller");

router.route("/login")
    .post(auth.login);

module.exports = router;
