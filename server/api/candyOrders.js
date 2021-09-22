const CandyOrders = require('../db/models/CandyOrders');
const Candy = require('../db/models/Candy');
const router = require('express').Router();

router.post('/', async (req, res, next) => {
  try {
    const candyOrder = await CandyOrders.create({
      candyId: req.body.candyId,
      orderId: req.body.orderId,
      quantity: req.body.quantity,
    });
    const [eagerLoadedCandyOrder] = await CandyOrders.findAll({
      include: [Candy],
      where: {
        candyId: candyOrder.candyId,
        orderId: candyOrder.orderId,
      },
    });
    res.json(eagerLoadedCandyOrder);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const [candyOrders] = await CandyOrders.findAll({
      where: {
        candyId: req.body.candyId,
        orderId: req.body.orderId,
      },
    });
    const updatedOrder = await candyOrders.update(req.body);
    const [eagerLoadedUpdatedCandy] = await CandyOrders.findAll({
      include: [Candy],
      where: {
        candyId: updatedOrder.candyId,
        orderId: updatedOrder.orderId,
      },
    });
    res.json(eagerLoadedUpdatedCandy);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
