const CandyOrders = require("../db/models/CandyOrders");
const Candy = require("../db/models/Candy");
const router = require("express").Router();

router.post("/", async (req, res, next) => {
  try {
    const candyOrder = await CandyOrders.create({
      candyId: req.body.candyId,
      orderId: req.body.orderId,
      quantity: req.body.quantity,
    });
    res.json(candyOrder);
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const [candyOrders] = await CandyOrders.findAll({
      where: {
        candyId: req.body.candyId,
        orderId: req.body.orderId,
      },
    });

    res.json(await candyOrders.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
