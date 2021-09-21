const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const CandyOrders = db.define('candyorders', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CandyOrders;
