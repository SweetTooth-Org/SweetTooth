const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');
const { alphabet } = require('../seedData');

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.STRING,
  },
  isFulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;

Order.beforeCreate((order) => {
  order.orderNumber = randomStringGen();
});

const randomStringGen = function () {
  let string;
  for (let i = 0; i < 5; i++) {
    const num = genRandomNum(0, 100);
    let letter = genRandomLetter();
    console.log('hello');
    if (i % 2 === 0) letter = letter.toUpperCase();
    string =
      string === undefined ? `${num}${letter}` : `${string}${num}${letter}`;
  }
  return string;
};

function genRandomNum(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1) + min);
  return num;
}

function genRandomLetter() {
  const num = genRandomNum(0, 25);
  return alphabet[num];
}
