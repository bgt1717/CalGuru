const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addMeal,
  getMeals,
  getDailySummary,
  deleteMeal,
} = require("../controllers/mealController");

// Protect all meal routes
router.get("/", auth, getMeals);

router.get("/summary", auth, getDailySummary);

router.post("/", auth, addMeal);

router.delete("/:id", auth, deleteMeal);

module.exports = router;