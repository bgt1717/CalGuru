const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
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

    profile: {
      age: {
        type: Number,
        default: null,
      },

      gender: {
        type: String,
        enum: ["male", "female"],
        default: "male",
      },

      // Stored in centimeters
      heightCm: {
        type: Number,
        default: null,
      },

      // Stored in kilograms
      weightKg: {
        type: Number,
        default: null,
      },

      activityLevel: {
        type: String,
        enum: [
          "sedentary",
          "light",
          "moderate",
          "active",
          "very-active",
        ],
        default: "moderate",
      },

      goal: {
        type: String,
        enum: ["lose", "maintain", "gain"],
        default: "maintain",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);