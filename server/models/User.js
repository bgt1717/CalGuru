const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    goals: {
      calories: {
        type: Number,
        default: 2000,
      },

      protein: {
        type: Number,
        default: 150,
      },

      carbs: {
        type: Number,
        default: 250,
      },

      fat: {
        type: Number,
        default: 65,
      },

      water: {
        type: Number,
        default: 64,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);