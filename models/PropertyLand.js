const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
  // type: {
  //   type: String,
  //   enum: ["house"],
  //   required: true,
  // },
  city: { type: String, required: true },
  title: { type: String, required: true },
  titleDescription: { type: String, required: true },
  price: { type: Number, required: true },
  sizeType: {
    type: String,
    required: true,
    // enum: ['Small', 'Medium', 'Large']
  },
  size: { type: Number, required: true },
  priceType: {
    type: String,
    required: true,
    // enum: ['Per Acre', 'Per Hectare']
  },
  pricePerUnit: { type: Number, required: true },
  agent: { type: String, required: true },
  map: { type: String, required: true },
  description: { type: String, required: true },
  videos: { type: [String], required: false },
});

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
