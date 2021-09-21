const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: Sequelize.FLOAT,
  imageUrl: Sequelize.TEXT,
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Candy;
