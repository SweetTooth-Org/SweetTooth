const CandyOrders = require('../db/models/CandyOrders');
const Candy = require('../db/models/Candy');
const router = require('express').Router();
const { requireToken } = require('./gateKeepingMiddleWare');

// GET /api/candyOrders/:id
router.get('/:id', requireToken, async (req, res, next) => {
  try {
    const candyOrders = await CandyOrders.findAll({
      include: [Candy],
      where: {
        orderId: req.params.id,
      },
    });
    res.status(200).json(candyOrders);
  } catch (error) {
    next(error);
  }
});

// POST /api/candyOrders
router.post('/', requireToken, async (req, res, next) => {
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

// PUT /api/candyOrders
router.put('/', requireToken, async (req, res, next) => {
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
