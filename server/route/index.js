
const express = require("express");

const auth = require("./auth.route");
const participant = require("./participant.route");
const occupation = require("./occupation.route");
const company = require("./company.route");
const presentation = require("./presentation.route");

const router = express.Router();

router.use("/auth", auth);

router.use("/participant", participant);

router.use("/occupation", occupation);

router.use("/company", company);

router.use("/presentation", presentation);

module.exports = router;
