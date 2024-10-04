const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./configs/db");
const houseRoutes = require("./routes/propertyHouseRoutes");
const landRoutes = require("./routes/propertyLandRoutes");
// const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/house", houseRoutes);
app.use("/api/land", landRoutes);

// Error Handling Middleware
// app.use(errorHandler);

module.exports = app;
