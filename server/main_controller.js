
const express = require("express");
const bodyParser = require("body-parser");
const httpStatus = require("http-status");

const Database = require("./config/sequelize");
Database.createDb();

const MainRoute = require("./route/main.route.js");

class MainController {
    constructor () {
        this.app = express();
        this.mainRoute = new MainRoute();
    }

    main() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Credentials", true);
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

            if (req.method === "OPTIONS") {
                res.sendStatus(httpStatus.OK);
            }
            else {
                next();
            }
        });

        this.app.use("/", this.mainRoute.getRouter());

        this.app.listen(4000, () => {
            console.log("Listening...");
        });
    }
}

module.exports = MainController;
