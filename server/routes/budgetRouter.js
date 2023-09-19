const router = require("express").Router();

const extractMonth = require("../middleware/extractMonth");

const budgetController = require("../controllers/budgetController");

router.get("/:id", extractMonth, budgetController.getBudget);

router.post("/:id", extractMonth, budgetController.setBudget);

module.exports = router;
