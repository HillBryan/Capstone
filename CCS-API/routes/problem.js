const express = require('express');
const fs = require('fs');
var exec = require('child_process').exec;
const router = express.Router();
const Problem = require('../model/problemModel.js');

//Getting all problems
router.get('/', async (req, res) => {
  try {
    const problem = await Problem.find();
    res.status(200).json(problem);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting specific problem
router.get('/class/', async (req, res) => {
  try {
    const problems = await Problem.find({
      class_id: req.body.class_id
    });
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting specific problem
router.get('/creator/', async (req, res) => {
  try {
    const problems = await Problem.find({
      creator_id: req.body.creator_id
    });
    res.status(200).json(problems);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Creating account
router.post('/', async (req, res) => {
  const problem = new Problem({
    statement: req.body.statement,
    example_in: req.body.example_in,
    example_out: req.body.example_out,
    class_id: req.body.class_id,
    creator_id: req.body.creator_id
  });
  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(200).json({
      message: 'Problem already exists.'
    });
  }
});

module.exports = router;
