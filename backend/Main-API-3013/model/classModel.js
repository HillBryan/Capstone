const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true  
    },
    creator_id: {
      type: String,
      required: true
    },
    course_secret: {
        type: String,
        required: true
      }
  },   
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Class', classSchema);
