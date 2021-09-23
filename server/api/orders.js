const Order = require('../db/models/Order');
const CandyOrders = require('../db/models/CandyOrders');
const router = require('express').Router();

// GET /api/orders/:id
router.get('/:id', async (req, res, next) => {
  try {
    const [cart] = await Order.findAll({
      where: {
        userId: req.params.id,
        isFulfilled: false,
      },
      include: [CandyOrders],
    });
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

//POST /api/orders/
router.post('/', async (req, res, next) => {
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
router.put("/", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.body.id)
    res.json(await order.update(req.body))
  } catch (error) {
    next(error)
  }
})

module.exports = router;
