const Sequelize = require("sequelize");

const pass = "yourPassword";

const connection = new Sequelize("askgabz", "root", pass, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
