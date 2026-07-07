const MealEntry = require("../models/MealEntry");
const Food = require("../models/Food");
const User = require("../models/User");

// ADD MEAL
exports.addMeal = async (req, res) => {
  try {
    const { foodId, servings, mealType, notes } = req.body;

    const food = await Food.findById(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    const meal = await MealEntry.create({
      user: req.user.userId,

      food: food._id,

      foodName: food.name,

      mealType,

      servings,

      notes,

      nutrition: {
        calories: food.calories * servings,
        protein: food.protein * servings,
        carbs: food.carbs * servings,
        fat: food.fat * servings,
        fiber: food.fiber * servings,
        sugar: food.sugar * servings,
        sodium: food.sodium * servings,
      },
    });

    res.status(201).json(meal);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

// GET MEALS FOR A DATE
exports.getMeals = async (req, res) => {
  try {
    let selectedDate = req.query.date
      ? new Date(req.query.date)
      : new Date();

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const meals = await MealEntry.find({
      user: req.user.userId,
      date: {
        $gte: start,
        $lte: end,
      },
    }).sort({
      createdAt: 1,
    });

    res.json(meals);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.deleteMeal = async (req, res) => {
  try {
    const meal = await MealEntry.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }

    await meal.deleteOne();

    res.json({
      message: "Meal deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// GET DAILY SUMMARY
exports.getDailySummary = async (req, res) => {
  try {
    const selectedDate = req.query.date
      ? new Date(req.query.date)
      : new Date();

    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    const meals = await MealEntry.find({
      user: req.user.userId,
      date: {
        $gte: start,
        $lte: end,
      },
    });

    const totals = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    };

    meals.forEach((meal) => {
      totals.calories += meal.nutrition.calories;
      totals.protein += meal.nutrition.protein;
      totals.carbs += meal.nutrition.carbs;
      totals.fat += meal.nutrition.fat;
      totals.fiber += meal.nutrition.fiber;
      totals.sugar += meal.nutrition.sugar;
      totals.sodium += meal.nutrition.sodium;
    });

    const user = await User.findById(req.user.userId);

    res.json({
      totals,
      goals: user.goals,
      remaining: {
        calories: user.goals.calories - totals.calories,
        protein: user.goals.protein - totals.protein,
        carbs: user.goals.carbs - totals.carbs,
        fat: user.goals.fat - totals.fat,
        water: user.goals.water,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};