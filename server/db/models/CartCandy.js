const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const CartCandy = db.define('cartcandy', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartCandy;
