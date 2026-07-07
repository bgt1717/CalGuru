const Food = require("../models/Food");

// CREATE FOOD
exports.createFood = async (req, res) => {
  try {
    const food = await Food.create({
      ...req.body,
      createdBy: req.user.userId,
    });

    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL FOODS
exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find({
      $or: [
        { isPublic: true },
        { createdBy: req.user.userId },
      ],
    });

    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE FOOD
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE FOOD
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.json({
      message: "Food deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};