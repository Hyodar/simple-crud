
const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./route/index.js");
const db = require("./config/sequelize");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(4000, () => {
    console.log("Listening...");
});
