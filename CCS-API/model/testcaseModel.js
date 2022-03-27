const mongoose = require('mongoose');

const testcaseSchema = new mongoose.Schema(
  {
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true  
    },
    problem_id: {
        type: String,
        required: true 
    }
  },   
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Submission', testcaseSchema);
