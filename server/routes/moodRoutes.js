const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createMood, getUserMoods } = require("../controllers/moodController");

const router = express.Router();

router.post("/", protect, createMood);
router.get("/", protect, getUserMoods);

module.exports = router;
