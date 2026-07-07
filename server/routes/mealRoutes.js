const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  addMeal,
  getMeals,
  getDailySummary,
  deleteMeal,
} = require("../controllers/mealController");

router.get("/", getMeals);

router.get("/summary", getDailySummary);

router.post("/", addMeal);

router.delete("/:id", deleteMeal);

module.exports = router;