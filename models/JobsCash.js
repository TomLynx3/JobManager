const mongoose = require("mongoose");

const JobsCashSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  date: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  material: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  worker: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  total_earned: {
    type: Number,
  },
});

module.exports = mongoose.model("jobsCash", JobsCashSchema);
