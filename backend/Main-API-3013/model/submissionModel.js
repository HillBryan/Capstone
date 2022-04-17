const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    submissionText: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true
    },
    problem_id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: false
    },
    passed: {
      type: Number,
      required: false
    },
    total: {
      type: Number,
      required: false
    },
    problem_name: {
      type: String,
      required: false
    },
  },   
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Submission', submissionSchema);
