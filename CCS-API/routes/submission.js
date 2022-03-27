const express = require('express');
const fs = require('fs');
var exec = require('child_process').exec;
const router = express.Router();
const Submission = require('../model/submissionModel.js');

//Getting all submissions
router.get('/', async (req, res) => {
  try {
    const submission = await Submission.find();
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Getting submissions by id
router.post('/id/', async (req, res) => {
  try {
    const submission = await Submission.find({
      _id: req.body.id
    });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//Solving submission
router.post('/solve/', async (req, res) => {
  try {
    const foundSubmission = await Submission.find({
      _id: req.body.id
    });

    let submission = foundSubmission[0];

    // Writing submission to file
    fs.writeFile(submission.className + '.java', submission.submissionText, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
      exec('javac ' + submission.className + '.java', function (error, stdOut, stdErr) {
        if (error || stdOut || stdErr) {
          Submission.updateOne(
            { "_id": submission._id}, // Filter
            {$set: {"status": 'Compile Error'}} // Update
          ).then(
            res.status(400).json({
              status: 'Compile Error'
            })
          );
        } else {
          // Need to get testcase input and output at this point.
          testcase = 'Testing123';
          exec('java ' + submission.className, function (error, stdOut, stdErr) {
            if (error || stdErr) {
              Submission.updateOne(
                { "_id": submission._id}, // Filter
                {$set: {"status": 'Run Time Error'}} // Update
              ).then(
                res.status(400).json({
                  status: 'Run Time Error'
                })
              );
            } 
            else if (stdOut.trim() !== testcase.trim()) {
              Submission.updateOne(
                { "_id": submission._id}, // Filter
                {$set: {"status": 'Test Case Fail'}} // Update
              ).then(
                res.status(400).json({
                  status: 'Test Case Fail'
                })
              );
            } else {
              // res.status(200).json({
              //   status: 'Pass',
              //   // Patch submission to save progress.
              //   // TODO: Figure out how to respond via JSON for this on multiple cases.
              // });
            }
          });
        }
      });
    });
    
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});


//Creating account
router.post('/', async (req, res) => {
  let ok = true;
  const submission = new Submission({
    submissionText: req.body.submissionText,
    className: req.body.className,
    user_id: req.body.user_id,
    status: req.body.status ? req.body.status : 'Not Started',
    problem_id: req.body.problem_id,
    passed: req.body.passed ? req.body.passed : 0
  });
  try {
    const newSubmission = await submission.save();
    res.status(200).json({
      id: newSubmission._id
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error Submitting: ' + err
    });
  }
});

module.exports = router;
