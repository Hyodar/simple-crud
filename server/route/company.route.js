
const express = require("express");

const expressJwt = require("express-jwt");
const jwtErrorHandler = require("../helpers/jwt_error_handler");

const CompanyController = require("../controller/company.controller");

class CompanyRoute {
    constructor () {
        this.company = new CompanyController();
    }

    getRouter() {
        const router = express.Router();

        router.use(
            expressJwt({ secret: "secret", algorithms: ["HS256"], requestProperty: "auth" }),
            jwtErrorHandler("auth")
        );
        
        router.route("/get-all")
            .post(this.company.getAll);
        
        router.route("/create")
            .post(this.company.create);
        
        router.route("/update")
            .post(this.company.update);
        
        router.route("/delete")
            .post(this.company.destroy);
        
        return router;
    }
}

module.exports = CompanyRoute;
