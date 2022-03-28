const express = require('express');
const fs = require('fs');
var exec = require('child_process').exec;
const router = express.Router();
const Api = require('../model/apiModel.js');

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

//Getting all submissions
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

module.exports = router;
