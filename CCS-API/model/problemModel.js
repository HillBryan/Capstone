const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    statement: {
        type: String,
        required: true
    },
    example_in: {
        type: String,
        required: true  
    },
    example_out: {
        type: String,
        required: true 
    },
    class_id: {
      type: String,
      required: false 
    },
    creator_id: {
      type: String,
      required: false
    }
  },   
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Submission', problemSchema);
