const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema(
  {
    ip: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true 
    }
  },   
  { 
    timestamps: true 
  });

module.exports = mongoose.model('Api', apiSchema);
