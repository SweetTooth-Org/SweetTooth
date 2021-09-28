const router = require('express').Router();
const { requireToken, isAdmin } = require('./gateKeepingMiddleWare');
const {
  models: { Candy },
} = require('../db');

// GET Request /api/candies
router.get('/', async (req, res, next) => {
  try {
    const candies = await Candy.findAll();
    res.status(200).json(candies);
  } catch (err) {
    next(err);
  }
});

router.get('/:candyId', async (req, res, next) => {
  try {
    const singleCandy = await Candy.findByPk(req.params.candyId);
    res.status(200).json(singleCandy);
  } catch (err) {
    next(err);
  }
});

//Now protected by requireToken
//Token is sent from client, varified, then proceed...
router.delete('/:candyId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const candyId = req.params.candyId;
    await Candy.findByPk(candyId).then(async (candy) => {
      await candy.destroy();
    });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

//Now protected by requireToken
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { name, price, imageUrl, description } = req.body;
    const newCandy = await Candy.create({
      name,
      price,
      imageUrl,
      description,
    });

    res.status(200).send(newCandy);
  } catch (error) {
    next(error);
  }
});

//Now protected by requireToken
//To many database calls!
router.put('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const { candyId, candyInfo } = req.body;

    const singleCandy = await Candy.findByPk(candyId).then(function (candy) {
      return candy.update(candyInfo);
    });

    res.status(200).send(singleCandy);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
