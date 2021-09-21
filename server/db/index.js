//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Candy = require('./models/Candy');
const Cart = require('./models/Cart');
const CartCandy = require('./models/CartCandy');

//associations could go here!
User.hasOne(Cart);
Cart.belongsTo(User);

Candy.hasOne(CartCandy);
CartCandy.belongsTo(Candy);

CartCandy.belongsTo(Cart);
Cart.hasMany(CartCandy);
module.exports = {
  db,
  models: {
    User,
    Candy,
    Cart,
    CartCandy,
  },
};
