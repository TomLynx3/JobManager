const mongoose = require("mongoose");

const JobsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  date: {
    type: String,
    required: true,
  },
  invoice: {
    type: Number,
  },
  company: {
    type: String,
    required: true,
  },
  type: {
    type: String,
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
  taxes: {
    type: Number,
  },
  total_earned: {
    type: Number,
    required: true,
  },
  unpaid: {
    type: Boolean,
  },
  worker: {
    type: String,
  },
});

module.exports = mongoose.model("jobs", JobsSchema);
