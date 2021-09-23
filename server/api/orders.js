const Order = require("../db/models/Order");
const router = require("express").Router();

//GET /api/orders/:userId
// router.get('/:userId', async (req, res, next) => {
//   try {
//     const order = await Order.findAll({
//       where: {
//         userId: req.params.userId,
//         isFulfilled: false
//       }
//     })
//   } catch (error) {
//     next(error)
//   }
// })

//POST /api/orders/
router.post("/", async (req, res, next) => {
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
