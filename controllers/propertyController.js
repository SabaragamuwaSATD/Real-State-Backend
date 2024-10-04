const sendResponse = require("../middleware/responseHandler");
const Property = require("../models/Property");
const { upload } = require("../configs/cloudinaryConfig");

// Add a new property
exports.addProperty = [
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res) => {
    console.log("Files:", req.files);
    console.log("Body:", req.body);

    const {
      // Common Fields.......................
      type,
      city,
      title,
      titleDescription,
      price,
      parking,
      agent,
      map,
      description,
      // property Specific Fields.................
      squareFeet,
      bedrooms,
      bathrooms,
      // Land Specific Fields..................
      sizeType,
      size,
      priceType,
      pricePerUnit,
    } = req.body;

    const photos = req.files["photos"]
      ? req.files["photos"].map((file) => ({ url: file.path }))
      : [];
    const videos = req.files["videos"]
      ? req.files["videos"].map((file) => ({ url: file.path }))
      : [];

    const property = new Property({
      // Common Fields.........................
      type,
      city,
      title,
      titleDescription,
      price,
      agent,
      map,
      description,
      photos,
      videos,
      // property Specific Fields.................
      squareFeet,
      bedrooms,
      bathrooms,
      parking,
      // Land Specific Fields..................
      sizeType,
      size,
      priceType,
      pricePerUnit,
    });

    try {
      const newProperty = await property.save();
      sendResponse(res, "CREATED", newProperty);
    } catch (err) {
      sendResponse(res, "BAD_REQUEST", { message: err.message });
    }
  },
];

// Retreive all properties
exports.getAllProperties = async (req, res) => {
  try {
    const { type } = req.query;

    const query = type ? { type: type } : {};

    const properties = await Property.find(query);
    sendResponse(res, "SUCCESS", properties);
  } catch (err) {
    sendResponse(res, "SERVER_ERROR", { message: err.message });
  }
};

// Get property by id
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", property);
  } catch (err) {
    sendResponse(res, "SERVER_ERROR", { message: err.message });
  }
};

// update property
exports.updateProperty = [
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "videos", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const propertyId = req.params.id;

      // Extract existing property data
      const existingProperty = await Property.findById(propertyId);
      if (!existingProperty) {
        return sendResponse(res, "NOT_FOUND");
      }

      // Handling new uploads
      const newPhotos = req.files["photos"]
        ? req.files["photos"].map((file) => ({ url: file.path }))
        : [];
      const newVideos = req.files["videos"]
        ? req.files["videos"].map((file) => ({ url: file.path }))
        : [];

      // Combine existing and new photos/videos (if any)
      const updatedPhotos = [...existingProperty.photos, ...newPhotos];
      const updatedVideos = [...existingProperty.videos, ...newVideos];

      // Update property data
      const updatedData = {
        ...req.body,
        photos: updatedPhotos,
        videos: updatedVideos,
      };

      const updatedProperty = await Property.findByIdAndUpdate(
        propertyId,
        updatedData,
        {
          new: true,
        }
      );

      sendResponse(res, "SUCCESS", updatedProperty);
    } catch (error) {
      console.error(error);
      sendResponse(res, "SERVER_ERROR");
    }
  },
];

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findByIdAndDelete(propertyId);
    if (!property) {
      return sendResponse(res, "NOT_FOUND");
    }
    sendResponse(res, "SUCCESS", { message: "Property deleted successfully" });
  } catch (err) {
    sendResponse(res, "SERVER_ERROR");
  }
};
