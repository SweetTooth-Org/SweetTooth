const router = require('express').Router();
const { requireToken } = require('./gateKeepingMiddleWare');
const {
  models: { User },
} = require('../db');
module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'isAdmin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
