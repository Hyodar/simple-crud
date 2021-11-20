
const express = require("express");

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const PresentationController = require("../controller/presentation.controller");

class PresentationRoute {
    constructor () {
        this.presentation = new PresentationController();
    }

    getRouter() {
        const router = express.Router();

        router.use(
            expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
            jwtErrorHandler("auth")
        );

        router.route("/get-all")
            .post(this.presentation.getAll);

        router.route("/create")
            .post(this.presentation.create);

        router.route("/update")
            .post(this.presentation.update);

        router.route("/delete")
            .post(this.presentation.destroy);

        return router;
    }
}

module.exports = PresentationRoute;
