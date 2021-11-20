
const express = require("express");

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const OccupationController = require("../controller/occupation.controller");
const ParticipantRoute = require("./participant.route");

class OccupationRoute {
    constructor () {
        this.occupation = new OccupationController();
    }

    getRouter() {
        const router = express.Router();

        router.use(
            expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
            jwtErrorHandler("auth")
        );
        
        router.route("/get-all")
            .post(this.occupation.getAll);
        
        router.route("/create")
            .post(this.occupation.create);
        
        router.route("/update")
            .post(this.occupation.update);
        
        router.route("/delete")
            .post(this.occupation.destroy);
        
        return router;
    }
}

module.exports = ParticipantRoute;
