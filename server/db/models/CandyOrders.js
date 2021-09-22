const Sequelize = require('sequelize');
const db = require('../db');

const CandyOrders = db.define('candyorders', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      max: 10,
      min: 0,
    },
  },
});

module.exports = CandyOrders;
