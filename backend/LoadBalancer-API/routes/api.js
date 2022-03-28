const express = require('express');
const router = express.Router();
const Api = require('../model/apiModel.js');
const Index = require('../model/indexModel.js');

//Getting all apis
router.get('/', async (req, res) => {
  try {
    const apis = await Api.find();
    res.status(200).json(apis);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting api by index
router.post('/index/', async (req, res) => {
  try {
    const server = await Api.find({
      index: req.body.index
    });
    res.status(200).json(server);
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

//Getting api balanced
router.get('/ip/', async (req, res) => {
  try {
    const indexRecord = await Index.find();
    console.log(indexRecord);

    // Get server at index
    const server = await Api.find({
      index: indexRecord[0].index
    });

    // Update index to be + 1 % 3
    Index.updateOne(
      { _id: indexRecord[0]._id }, // Filter
      { $set: { index: ((indexRecord[0].index + 1) % 3) } } // Update
    ).then(
      res.status(200).json({
        server,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err
    });
  }
});

//Creating api
router.post('/', async (req, res) => {
  const newApi = new Api({
    ip: req.body.ip,
    index: req.body.index,
  });
  try {
    const saved = await newApi.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(200).json({
      message: 'api already exists.'
    });
  }
});

//Creating api
router.get('/index', async (req, res) => {
  const index = new Index({
    index: 0
  });
  try {
    const saved = await index.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(200).json({
      message: 'index already exists.'
    });
  }
});

module.exports = router;
