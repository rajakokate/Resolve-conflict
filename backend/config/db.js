
const mongoose = require("mongoose");
const MongoDBUrl = process.env.MONGODB_URL;
const connectDB = async () => {
  try {
    /// connect to mongodb
    await mongoose.connect(
      MongoDBUrl
    );
    console.log("MongoDB connected successfully"); // Log successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message); // log error if connection fails
    // process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
