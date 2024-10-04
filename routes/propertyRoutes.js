const express = require("express");
const router = express.Router();

const houseController = require("../controllers/propertyController");

// Main routes
router.post("/", houseController.addProperty);
router.get("/", houseController.getAllProperties);
router.get("/:id", houseController.getPropertyById);
router.put("/update/:id", houseController.updateProperty);
router.delete("/delete/:id", houseController.deleteProperty);

// Sub routes

module.exports = router;
