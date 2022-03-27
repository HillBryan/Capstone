const express = require('express');
const fs = require('fs');
var exec = require('child_process').exec;
const router = express.Router();
const Submission = require('../model/submissionModel.js');
const TestCase = require('../model/testcaseModel.js')

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

    const testcases = await TestCase.find({
      problem_id: submission.problem_id
    });
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
          let passed = 0;
          let valid = true;

          for (let i = 0; i < testcases.length && valid === true; i += 1) {
            let testcase = testcases[i];
            let testcase_input = testcase.input;
            let testcase_output = testcase.output;


            // Need to write file with input
            await fs.writeFile('input.txt', testcase_input, err => {
              if (err) {
                console.error(err)
                return
              }
              console.log(i);
              exec('java ' + submission.className + ' < input.txt', function (error, stdOut, stdErr) {
                if ((error || stdErr) && valid) {
                  console.log(error, stdErr);
                  valid = false;
                  Submission.updateOne(
                    { "_id": submission._id}, // Filter
                    {$set: {"status": 'Run Time Error'}} // Update
                  ).then(
                    res.status(400).json({
                      status: 'Run Time Error'
                    })
                  );
                } 
                else if (stdOut.trim() !== testcase_output.trim() && valid) {
                  valid = false;
                  console.log(stdOut.trim(), testcase_output.trim());
                  console.log(testcase_input, testcase.output);
                  Submission.updateOne(
                    { "_id": submission._id}, // Filter
                    {$set: {"status": 'Test Case Fail'}} // Update
                  ).then(
                    res.status(400).json({
                      status: 'Test Case Fail'
                    })
                  );
                } else{
                  // Update passed testcases here.
                  if (valid) {
                    passed = passed + 1;
                    Submission.updateOne(
                      { "_id": submission._id}, // Filter
                      {$set: {"passed": passed}} // Update
                    ).then(
                      console.log('done')
                    );
                  }
                }
              });
            });
          };
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
