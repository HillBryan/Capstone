const express = require("express");
const router = express.Router();
const User = require("../model/userModel.js");
const Class = require("../model/classModel.js");

//Getting all problems
router.post("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Getting specific problem
router.post("/findCourses/", async (req, res) => {
  try {
    const users = await User.find({
      account_id: req.body.account_id,
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Creating account
router.post("/", async (req, res) => {
  const user = new User({
    account_id: req.body.account_id,
    course_id: req.body.course_id,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(200).json({
      message: "Account already exists.",
    });
  }
});

module.exports = router;
