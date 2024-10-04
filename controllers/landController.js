const sendResponse = require("../middleware/responseHandler");
const Land = require("../models/PropertyLand");

// Add a new Land
exports.addLand = async (req, res) => {
  const {
    city,
    title,
    titleDescription,
    price,
    sizeType,
    size,
    priceType,
    pricePerUnit,
    agent,
    map,
    description,
    videos,
  } = req.body;

  const land = new Land({
    city,
    title,
    titleDescription,
    price,
    sizeType,
    size,
    priceType,
    pricePerUnit,
    agent,
    map,
    description,
    videos,
  });

  try {
    const newLand = await land.save();
    sendResponse(res, "SUCCESS", newLand);
  } catch (err) {
    sendResponse(res, "BAD_REQUEST", { message: err.message });
  }
};

// Retreive all Lands
exports.getAllLands = async (req, res) => {
  try {
    const lands = await Land.find();
    sendResponse(res, "SUCCESS", lands);
  } catch (err) {
    sendResponse(res, "SERVER_ERROR", { message: err.message });
  }
};

// Get land by id
exports.getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", land);
  } catch (err) {
    sendResponse(res, "SERVER_ERROR", { message: err.message });
  }
};

// Update Land
exports.updateLand = async (req, res) => {
  try {
    const landId = req.params.id;
    const updatedLand = await Land.findByIdAndUpdate(landId, req.body, {
      new: true,
    });

    if (!updatedLand) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", updatedLand);
  } catch (error) {
    sendResponse(res, "SERVER_ERROR");
  }
};

// Delete Land
exports.deleteLand = async (req, res) => {
  try {
    const landId = req.params.id;
    const land = await Land.findByIdAndDelete(landId);
    if (!land) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", { message: "Land deleted successfully" });
  } catch (err) {
    sendResponse(res, "SERVER_ERROR");
  }
};
