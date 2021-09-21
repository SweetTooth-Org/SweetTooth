const Sequelize = require('sequelize');
const db = require('../db');
const axios = require('axios');

const Cart = db.define('cart', {});

module.exports = Cart;
