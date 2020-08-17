const mongoose = require("mongoose");

const TempUserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdAt: { type: Date, required: true, default: Date.now, expires: 42000 },
});

module.exports = mongoose.model("tempUser", TempUserSchema);
