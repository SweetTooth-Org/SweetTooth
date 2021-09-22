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
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGllc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  },
  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Candy;
