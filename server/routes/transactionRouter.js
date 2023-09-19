const router = require("express").Router();

const transactionController = require("../controllers/transactionController");

router.get("/", transactionController.getTransactions);

router.post("/", transactionController.addTransaction);

router.put("/:id", transactionController.updateTransaction);

router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;
