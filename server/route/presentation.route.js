
const express = require("express");
const router = express.Router();

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const presentation = require("../controller/presentation.controller");

router.use(
    expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
    jwtErrorHandler("auth")
);

router.route("/get-all")
    .post(presentation.getAll);

router.route("/create")
    .post(presentation.create);

router.route("/update")
    .post(presentation.update);

router.route("/delete")
    .post(presentation.destroy);

module.exports = router;
