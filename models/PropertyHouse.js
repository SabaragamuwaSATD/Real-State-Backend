const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  // type: {
  //   type: String,
  //   enum: ["house"],
  //   required: true,
  // },
  city: { type: String, required: true },
  title: { type: String, required: true },
  titleDescription: { type: String, required: true },
  price: { type: Number, required: true },
  squareFeet: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  parking: { type: String, required: true },
  agent: { type: String, required: true },
  map: { type: String, required: true },
  description: { type: String, required: true },
  videos: { type: [String], required: false },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
