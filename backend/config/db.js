const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    /// connect to mongodb
    await mongoose.connect(
      "mongodb+srv://raja:JtsOMyE0pWGDGSj2@cluster0.vycns8c.mongodb.net/form-builder?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully"); // Log successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message); // log error if connection fails
    // process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;
