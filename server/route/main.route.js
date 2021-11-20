
const express = require("express");

const AuthRoute = require("./auth.route");
const ParticipantRoute = require("./participant.route");
const OccupationRoute = require("./occupation.route");
const CompanyRoute = require("./company.route");
const PresentationRoute = require("./presentation.route");

class MainRoute {
    constructor () {
        this.auth = new AuthRoute();
        this.participant = new ParticipantRoute();
        this.occupation = new OccupationRoute();
        this.company = new CompanyRoute();
        this.presentation = new PresentationRoute();
    }

    getRouter() {
        const router = express.Router();

        router.use("/auth", this.auth.getRouter());

        router.use("/participant", this.participant.getRouter());

        router.use("/occupation", this.occupation.getRouter());

        router.use("/company", this.company.getRouter());

        router.use("/presentation", this.presentation.getRouter());

        return router;
    }
}

module.exports = MainRoute;
