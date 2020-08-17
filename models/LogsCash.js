const mongoose = require("mongoose");

const LogsCashSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model("logsCash", LogsCashSchema);
