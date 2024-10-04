const sendResponse = require("../middleware/responseHandler");
const House = require("../models/PropertyHouse");
const { upload } = require("../configs/cloudinaryConfig");

// Add a new house
exports.addHouse = [
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res) => {
    console.log("Files:", req.files); // Check if videos are coming through
    console.log("Body:", req.body);

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
    } = req.body;

    const photos = req.files["photos"]
      ? req.files["photos"].map((file) => file.path)
      : [];
    const videos = req.files["videos"]
      ? req.files["videos"].map((file) => file.path)
      : [];

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
      photos,
      videos,
    });

    try {
      const newHouse = await house.save();
      sendResponse(res, "CREATED", newHouse);
    } catch (err) {
      //   sendResponse(res, "BAD_REQUEST", { message: err.message });
      console.error("Error Details:", JSON.stringify(err)); // Log full error
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
      }
      res
        .status(500)
        .json({ message: "Internal Server Error", error: err.message });
    }
  },
];

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
