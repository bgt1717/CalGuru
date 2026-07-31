const User = require("../models/User");

// GET /api/profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "profile goals username email"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// PUT /api/profile
const updateProfile = async (req, res) => {
  try {
    const {
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      goal,
    } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.profile = {
      age,
      gender,
      heightCm,
      weightKg,
      activityLevel,
      goal,
    };

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profile: user.profile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};