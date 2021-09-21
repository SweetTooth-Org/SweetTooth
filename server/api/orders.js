const Order = require('../db/models/Order')
const router = require('express').Router()

//GET /api/orders/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
  } catch (error) {
    next(error)
  }
})
