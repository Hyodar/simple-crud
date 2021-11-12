
const express = require("express");
const router = express.Router();

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const participant = require("../controller/participant.controller");

router.use(
    expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
    jwtErrorHandler("auth")
);

router.route("/get-all")
    .post(participant.getAll);

router.route("/create")
    .post(participant.create);

router.route("/update")
    .post(participant.update);

router.route("/delete")
    .post(participant.destroy);

module.exports = router;
