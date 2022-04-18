const express = require('express');
const router = express.Router();
const Account = require('../model/accountModel.js');

//Getting all problems
router.post('/all', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting specific problem
router.post('/find/', async (req, res) => {
  try {
    const accounts = await Account.find({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Creating account
router.post('/', async (req, res) => {
  const account = new Account({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  try {
    const newAccount = await account.save();
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(200).json({
      message: 'Account already exists.'
    });
  }
});

module.exports = router;
