
const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./route/index.js");
const db = require("./config/sequelize");
const httpStatus = require("http-status");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
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

app.use("/", routes);

app.listen(4000, () => {
    console.log("Listening...");
});
