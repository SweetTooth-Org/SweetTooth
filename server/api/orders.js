const Order = require('../db/models/Order');
const router = require('express').Router();
const { requireToken } = require('./gateKeepingMiddleWare');

// GET /api/orders/:id
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      where: {
        userId: req.user.id,
        isFulfilled: false,
      },
    });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

//POST /api/orders/
router.post('/', requireToken, async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.body.userId,
    });
    res.status(201).send(order);
  } catch (error) {
    next(error);
  }
});

//PUT /api/orders
router.put('/', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.id);
    res.json(await order.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
