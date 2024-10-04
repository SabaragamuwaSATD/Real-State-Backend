const express = require("express");
const router = express.Router();

const landController = require("../controllers/landController");

router.post("/", landController.addLand);
router.get("/", landController.getAllLands);
router.get("/:id", landController.getLandById);
router.put("/update/:id", landController.updateLand);
router.delete("/delete/:id", landController.deleteLand);

module.exports = router;
