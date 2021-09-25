const Sequelize = require('sequelize');
const db = require('../db');

const CandyOrders = db.define('candyorders', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      max: 10,
      min: 1,
    },
  },
  price: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CandyOrders;
