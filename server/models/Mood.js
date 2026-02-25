const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);
