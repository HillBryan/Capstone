const express = require("express");
const fs = require("fs");
var exec = require("child_process").exec;
const router = express.Router();
const Submission = require("../model/submissionModel.js");
const TestCase = require("../model/testcaseModel.js");

//Getting all submissions
router.post("/all", async (req, res) => {
  try {
    const submission = await Submission.find();
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Getting submissions by id
router.post("/id/", async (req, res) => {
  try {
    const submission = await Submission.find({
      _id: req.body.id,
    });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/user/", async (req, res) => {
  try {
    const submission = await Submission.find({
      user_id: req.body.user_id,
    });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post("/problem/", async (req, res) => {
  try {
    const submission = await Submission.find({
      problem_id: req.body.problem_id,
    });
    res.status(200).json(submission);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Solving submission
router.post("/solve/", async (req, res) => {
  try {
    const foundSubmission = await Submission.find({
      _id: req.body.id,
    });
    let submission = foundSubmission[0];

    const testcases = await TestCase.find({
      problem_id: submission.problem_id,
    });
    // Writing submission to file
    fs.writeFile(
      submission.className + ".java",
      submission.submissionText,
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        //file written successfully
        exec(
          "javac " + submission.className + ".java",
          function (error, stdOut, stdErr) {
            if (error || stdOut || stdErr) {
              Submission.updateOne(
                { _id: submission._id }, // Filter
                { $set: { status: "Compile Error", total: testcases.length } } // Update
              ).then(
                res.status(200).json({
                  status: "Compile Error",
                })
              );
            } else {
              let valid = true;

              // Async function for running code against test case.
              let wrapperFunction = function (
                testcase_input,
                testcase_output,
                i
              ) {
                return new Promise((resolve, reject) => {
                  // Need to write file with input
                  fs.writeFile(
                    submission._id + ".txt",
                    testcase_input,
                    (err) => {
                      if (err) {
                        valid = false;
                        console.error(err);
                        return;
                      }
                      exec(
                        "java " +
                          submission.className +
                          " < " +
                          submission._id +
                          ".txt",
                        function (error, stdOut, stdErr) {
                          if (error || stdErr) {
                            console.log(error, stdErr);
                            valid = false;
                            Submission.updateOne(
                              { _id: submission._id }, // Filter
                              {
                                $set: {
                                  status: "Run Time Error",
                                  total: testcases.length,
                                },
                              } // Update
                            ).then(
                              res.status(200).json({
                                status: "Run Time Error",
                              })
                            );
                          } else if (stdOut.trim() !== testcase_output.trim()) {
                            console.log(stdOut.trim(), testcase_output.trim());
                            valid = false;
                            Submission.updateOne(
                              { _id: submission._id }, // Filter
                              {
                                $set: {
                                  status: "Wrong Answer",
                                  total: testcases.length,
                                },
                              } // Update
                            ).then(
                              res.status(200).json({
                                status: "Wrong Answer",
                                input: testcase_input,
                                expected: testcase_output.trim(),
                                actual: stdOut.trim(),
                              })
                            );
                          } else {
                            // Update passed testcases here.
                            Submission.updateOne(
                              { _id: submission._id }, // Filter
                              { $set: { passed: i + 1 } } // Update
                            ).then(resolve());
                          }
                        }
                      );
                    }
                  );
                });
              };

              // Async Function for running code for each test case.
              const testAllCases = async () => {
                for (
                  let i = 0;
                  i < testcases.length && valid === true;
                  i += 1
                ) {
                  let testcase = testcases[i];
                  let testcase_input = testcase.input;
                  let testcase_output = testcase.output;

                  await wrapperFunction(testcase_input, testcase_output, i);
                }
              };

              // Running code aginst all test cases
              Submission.updateOne(
                { _id: submission._id },
                { $set: { status: "Running" } }
              ).then(() => {
                testAllCases().then(() => {
                  if (valid) {
                    Submission.updateOne(
                      { _id: submission._id },
                      { $set: { status: "Passed", total: testcases.length } }
                    ).then(
                      res.status(200).json({
                        status: "Pass",
                      })
                    );
                  }
                });
              });
            }
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//Creating account
router.post("/", async (req, res) => {
  let ok = true;
  const submission = new Submission({
    submissionText: req.body.submissionText,
    className: req.body.className,
    user_id: req.body.user_id,
    status: req.body.status ? req.body.status : "Not Started",
    problem_id: req.body.problem_id,
    problem_name: req.body.problem_name,
    passed: req.body.passed ? req.body.passed : 0,
  });
  try {
    const newSubmission = await submission.save();
    res.status(200).json({
      id: newSubmission._id,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error Submitting: " + err,
    });
  }
});

module.exports = router;
