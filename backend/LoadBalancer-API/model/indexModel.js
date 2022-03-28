const mongoose = require("mongoose");

const indexModel = new mongoose.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("index", indexModel);
