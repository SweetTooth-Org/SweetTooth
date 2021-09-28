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
    const { candyId, orderId, quantity, price } = req.body;
    const candyOrder = await CandyOrders.create({
      candyId,
      orderId,
      quantity,
      price,
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
    let quantity = req.body.quantity
    let price = req.body.price
    const updatedOrder = await candyOrders.update({
      price,
      quantity
    });
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

router.delete('/:orderId/candy/:candyId', requireToken, async (req, res, next) => {
  try {
    const { candyId, orderId } = req.params;
    const [itemToDelete] = await CandyOrders.findAll({
      where: {
        candyId,
        orderId,
      },
    });
    res.status(200).json(await itemToDelete.destroy());
  } catch (error) {
    next(error);
  }
});

module.exports = router;
