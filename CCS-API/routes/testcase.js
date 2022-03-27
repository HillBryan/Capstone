const express = require('express');
const fs = require('fs');
var exec = require('child_process').exec;
const router = express.Router();
const TestCase = require('../model/testcaseModel.js');

//Getting all submissions
router.get('/', async (req, res) => {
  try {
    const testcase = await TestCase.find();
    res.status(200).json(testcase);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting all submissions
router.get('/id/', async (req, res) => {
  try {
    const testcase = await TestCase.find({
      problem_id: req.body.problem_id
    });
    res.status(200).json(testcase);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Creating tescase
router.post('/', async (req, res) => {
  const testcase = new TestCase({
    input: req.body.input,
    output: req.body.output,
    problem_id: req.body.problem_id,
  });
  try {
    const newTestCase = await testcase.save();
    res.status(201).json(newTestCase);
  } catch (err) {
    res.status(200).json({
      message: 'TestCase already exists.'
    });
  }
});

module.exports = router;
