
const express = require("express");

const AuthController = require("../controller/auth.controller");

class AuthRoute {
    constructor () {
        this.auth = new AuthController();
    }

    getRouter() {
        const router = express.Router();

        router.route("/login")
            .post(this.auth.login);

        return router;
    }
}

module.exports = AuthRoute;
