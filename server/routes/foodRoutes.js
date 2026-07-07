const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  createFood,
  getFoods,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

router.use(auth);

router.get("/", getFoods);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

module.exports = router;