
const express = require("express");
const router = express.Router();

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const company = require("../controller/company.controller");

router.use(
    expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
    jwtErrorHandler("auth")
);

router.route("/get-all")
    .post(company.getAll);

router.route("/create")
    .post(company.create);

router.route("/update")
    .post(company.update);

router.route("/delete")
    .post(company.destroy);

module.exports = router;
