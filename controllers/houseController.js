const sendResponse = require("../middleware/responseHandler");
const House = require("../models/PropertyHouse");

// Add a new house
exports.addHouse = async (req, res) => {
  const {
    city,
    title,
    titleDescription,
    price,
    squareFeet,
    bedrooms,
    bathrooms,
    parking,
    agent,
    map,
    description,
    videos,
  } = req.body;

  const house = new House({
    city,
    title,
    titleDescription,
    price,
    squareFeet,
    bedrooms,
    bathrooms,
    parking,
    agent,
    map,
    description,
    videos,
  });

  try {
    const newHouse = await house.save();
    sendResponse(res, "SUCCESS", newHouse);
  } catch (err) {
    sendResponse(res, "BAD_REQUEST", { message: err.message });
  }
};

// Retreive all houses
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await House.find();
    sendResponse(res, "SUCCESS", houses);
  } catch (err) {
    sendResponse(res, "SERVER_ERROR", { message: err.message });
  }
};

// Get house by id
exports.getHouseById = async (req, res) => {
  try {
    const house = await House.findById(req.params.id);
    if (!house) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", house);
  } catch (err) {
    sendResponse(res, "SERVER_ERROR", { message: err.message });
  }
};

exports.updateHouse = async (req, res) => {
  try {
    const houseId = req.params.id;
    const updatedHouse = await House.findByIdAndUpdate(houseId, req.body, {
      new: true,
    });

    if (!updatedHouse) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", updatedHouse);
  } catch (error) {
    sendResponse(res, "SERVER_ERROR");
  }
};

// Delete house
exports.deleteHouse = async (req, res) => {
  try {
    const houseId = req.params.id;
    const house = await House.findByIdAndDelete(houseId);
    if (!house) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", { message: "House deleted successfully" });
  } catch (err) {
    sendResponse(res, "SERVER_ERROR");
  }
};
