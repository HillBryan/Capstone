const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    account_id: {
      type: String,
      required: true,
    },
    course_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
