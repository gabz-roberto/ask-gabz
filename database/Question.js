const Sequelize = require("sequelize");
const connection = require("./database");

const Question = connection.define("questions", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Question.sync({ force: false })
    .then(() => {console.log('Tabela gerada')})
    .catch((err) => {console.log(`ERROR: ${err}`)})

module.exports = Question;