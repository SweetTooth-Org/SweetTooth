const router = require('express').Router();
const { requireToken } = require('./gateKeepingMiddleWare');
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
router.delete('/:candyId', requireToken, async (req, res, next) => {
  try {
    const candyId = req.params.candyId;
    await Candy.findByPk(candyId).then(async (campus) => {
      await campus.destroy();
    });
    const newCandyList = await Candy.findAll();
    res.send(newCandyList);
  } catch (error) {
    next(error);
  }
});

//Now protected by requireToken
router.post('/', requireToken, async (req, res, next) => {
  try {
    const { name, price, imageUrl, description } = req.body;
    await Candy.create({
      name,
      price,
      imageUrl,
      description,
    });
    const newCandyList = await Candy.findAll();
    res.send(newCandyList);
  } catch (error) {
    next(error);
  }
});

//Now protected by requireToken
//To many database calls!
router.put('/', requireToken, async (req, res, next) => {
  try {
    const { candyId, candyInfo } = req.body;
    const candy = await Candy.findByPk(candyId);
    if (candyInfo.imageUrl === '') {
      //If the candy to be updated does not have an imageUrl, we'd like for a default image to take it's place. Must be a better way to do this...
      candyInfo.imageUrl =
        'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FuZGllc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
    }
    await candy.update(candyInfo);
    await candy.save();
    const singleCandy = await candy.reload();
    const newCandyList = await Candy.findAll();
    res.send({ newCandyList, singleCandy });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
