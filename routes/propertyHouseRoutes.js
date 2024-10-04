const express = require("express");
const router = express.Router();

const houseController = require("../controllers/houseController");

router.post("/", houseController.addHouse);
router.get("/", houseController.getAllHouses);
router.get("/:id", houseController.getHouseById);
router.put("/update/:id", houseController.updateHouse);
router.delete("/delete/:id", houseController.deleteHouse);

module.exports = router;
