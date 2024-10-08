const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.auth = require("./auth.model.js")(sequelize, Sequelize);
// db.message = require("./message.model.js")(sequelize, Sequelize);

db.createTable = (name) => {
    db.table = require("./message.model.js")(sequelize, Sequelize, name);
    db.sequelize.sync();
}

module.exports = db;