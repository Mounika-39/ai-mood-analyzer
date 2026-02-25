const Mood = require("../models/Mood");
const analyzeMood = require("../services/aiService");

// CREATE MOOD ENTRY
exports.createMood = async (req, res) => {
  try {
    const { text } = req.body;

    const result = await analyzeMood(text);

    const moodEntry = await Mood.create({
      user: req.user._id,
      text,
      mood: result.mood,
      confidence: result.confidence,
    });

    res.status(201).json(moodEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER MOODS
exports.getUserMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
