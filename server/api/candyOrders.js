const CandyOrders = require('../db/models/CandyOrders')
const Candy = require('../db/models/Candy')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  try {
    console.log('entered /api/candyOrders post route')
    const candyOrder = await CandyOrders.create({
      candyId: req.body.candyId,
      orderId: req.body.orderId,
      quantity: req.body.quantity
    })
    res.json(candyOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
