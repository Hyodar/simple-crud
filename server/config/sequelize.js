
const Sequelize = require("sequelize");

const fs = require("fs");
const path = require("path");

const modelAssociations = require("./sequelize-associations");
const initializeDb = require("./db-defaults");

class Database {}

Database.createDb = () => {
    Database.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "./db.sqlite",
        logging: console.log,
    });

    Database.db = {};
    
    Database.sequelize.authenticate()
        .then(console.log)
        .catch(console.log);

        fs.readdirSync("./model")
        .forEach(file => {
            const model = require(`../model/${file}`)(Database.sequelize, Sequelize);
    
            Database.db[model.name] = model;
        });
    
    modelAssociations.forEach(({ source, target, type, params }) => {
        const sourceModel = Database.db[source];
        const targetModel = Database.db[target];
        sourceModel[type](targetModel, params || {});
    });
    
    const forceSync = true;
    
    Database.sequelize
        .sync({ force: forceSync })
        .then(() => {
            if (forceSync) {
                initializeDb(Database.db);
            }
        })
        .catch(err => console.error(err));
}

Database.getDb = () => {
    return Database.db;
}

module.exports = Database;
