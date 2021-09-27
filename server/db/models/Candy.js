const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: Sequelize.INTEGER,
  imageUrl: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

Candy.beforeUpdate(async function (candy) {
  const { name, price, imageUrl, description } = candy._previousDataValues;

  if (candy.dataValues.name === '') {
    candy.dataValues.name = name;
  }
  if (candy.dataValues.price === '') {
    candy.dataValues.price = price;
  }
  if (candy.dataValues.imageUrl === '') {
    candy.dataValues.imageUrl = imageUrl;
  }
  if (candy.dataValues.description === '') {
    candy.dataValues.description = description;
  }
});

Candy.beforeCreate(async function (candy) {
  const description = candy.dataValues.description;
  const imageUrl = candy.dataValues.imageUrl;

  if (description === undefined || description === null || description === '') {
    candy.dataValues.description = 'No Current Description';
  }

  if (imageUrl === undefined || imageUrl === null || imageUrl === '') {
    candy.dataValues.imageUrl =
      'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGllc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
  }
});

module.exports = Candy;
