const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
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
    difficulty: {
        type: String,
        required: false
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

module.exports = mongoose.model('Problem', problemSchema);
