
const express = require("express");


const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const ParticipantController = require("../controller/participant.controller");

class ParticipantRoute {
    constructor () {
        this.participant = new ParticipantController();
    }

    getRouter() {
        const router = express.Router();

        router.use(
            expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
            jwtErrorHandler("auth")
        );

        router.route("/get-all")
            .post(this.participant.getAll);

        router.route("/create")
            .post(this.participant.create);

        router.route("/update")
            .post(this.participant.update);

        router.route("/delete")
            .post(this.participant.destroy);

        return router;
    }
}

module.exports = ParticipantRoute;
