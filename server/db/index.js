//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Candy = require('./models/Candy');
const Order = require('./models/Order');
const CandyOrders = require('./models/CandyOrders');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Candy.belongsToMany(Order, { through: CandyOrders });
Order.belongsToMany(Candy, { through: CandyOrders });

module.exports = {
  db,
  models: {
    User,
    Candy,
    Order,
    CandyOrders,
  },
};
