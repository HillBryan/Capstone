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
    passed: {
      type: Number,
      required: false
    }
  },   
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Submission', submissionSchema);
