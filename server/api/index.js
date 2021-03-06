const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'))
router.use('/orders', require('./orders'))
router.use('/candies', require('./candies'))
router.use('/candyOrders', require('./candyOrders'))
router.use('/orders', require('./orders'))

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
