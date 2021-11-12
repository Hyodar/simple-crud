
const Sequelize = require("sequelize");

const fs = require("fs");
const path = require("path");

const modelAssociations = require("./sequelize-associations");
const initializeDb = require("./db-defaults");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: console.log,
});

sequelize.authenticate()
    .then(console.log)
    .catch(console.log);

const db = {};

fs.readdirSync("./model")
    .forEach(file => {
        const model = require(`../model/${file}`)(sequelize, Sequelize);

        db[model.name] = model;
    });

modelAssociations.forEach(({ source, target, type, params }) => {
    const sourceModel = db[source];
    const targetModel = db[target];
    sourceModel[type](targetModel, params || {});
});

const forceSync = true;

sequelize
    .sync({ force: forceSync })
    .then(() => {
        if (forceSync) {
            initializeDb(db);
        }
    })
    .catch(err => console.error(err));

module.exports = {
    sequelize,
    Sequelize,
    ...db
};
