const mongoose = require("mongoose");

const VerTokenSchema = mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 42000 },
});

module.exports = mongoose.model("verTokenSchema", VerTokenSchema);
