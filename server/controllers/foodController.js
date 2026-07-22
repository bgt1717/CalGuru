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
    }).sort({ name: 1 });

    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE FOOD
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    // Only the creator can edit custom foods
    if (
      food.createdBy &&
      food.createdBy.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    Object.assign(food, req.body);

    await food.save();

    res.json(food);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE FOOD
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    // prevent deleting public foods
    if (food.isPublic) {
      return res.status(403).json({
        message: "Public foods cannot be deleted",
      });
    }

    // only creator may delete
    if (food.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await food.deleteOne();

    res.json({
      message: "Food deleted",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};