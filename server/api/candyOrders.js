const CandyOrders = require('../db/models/CandyOrders');
const Candy = require('../db/models/Candy');
const router = require('express').Router();

// GET /api/candyOrders/:id
router.get('/:id', async (req, res, next) => {
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
router.post('/', async (req, res, next) => {
  try {
    const { candyId, orderId, quantity, price } = req.body;
    console.log(price);
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

router.delete('/:orderId/:candyId', async (req, res, next) => {
  try {
    console.log(req.params);
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
