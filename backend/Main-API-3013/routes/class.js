const express = require('express');
const router = express.Router();
const Class = require('../model/classModel.js');

//Getting all problems
router.post('/all', async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting specific problem
router.post('/creator/', async (req, res) => {
  try {
    const classes = await Class.find({
      creator_id: req.body.creator_id
    });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

router.post('/id/', async (req, res) => {
  try {
    const classes = await Class.find({
      _id: req.body.class_id
    });
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Creating account
router.post('/', async (req, res) => {
  const classN = new Class({
    name: req.body.name,
    code: req.body.code,
    instructor: req.body.instructor,
    creator_id: req.body.creator_id,
    course_secret: req.body.course_secret,
  });
  try {
    const newClass = await classN.save();
    res.status(201).json(newClass);
  } catch (err) {
    res.status(200).json({
      message: 'Class already exists.'
    });
  }
});

module.exports = router;
