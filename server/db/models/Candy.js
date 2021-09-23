const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Candy = db.define('candy', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
<<<<<<< HEAD
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },
=======
  price: Sequelize.DECIMAL(10, 2),
>>>>>>> master
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGllc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: 'No Current Description',
  },
});

// Candy.afterUpdate(async function (candy) {
//   const { name, price, imageUrl, description } = candy._previousDataValues;
//   if (candy.dataValues.name === '') {
//     candy.dataValues.name = name;
//   }
//   if (candy.dataValues.price === '') {
//     candy.dataValues.price = price;
//   }
//   if (candy.dataValues.imageUrl === '') {
//     candy.dataValues.imageUrl = imageUrl;
//   }
// if (candy.dataValues.description === '') {
//   candy.dataValues.description = description;
// }
// });

Candy.beforeCreate(function (candy) {
  if (candy.imageUrl === '') {
    candy.imageUrl =
      'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGllc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
  }
});

module.exports = Candy;
