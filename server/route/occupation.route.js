
const express = require("express");
const router = express.Router();

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const occupation = require("../controller/occupation.controller");

router.use(
    expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
    jwtErrorHandler("auth")
);

router.route("/get-all")
    .post(occupation.getAll);

router.route("/create")
    .post(occupation.create);

router.route("/update")
    .post(occupation.update);

router.route("/delete")
    .post(occupation.destroy);

module.exports = router;
