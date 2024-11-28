const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB server");
  } catch (error) {
    console.error("Error Detected:", error);
    throw error; // Rethrow the error to handle it in the main server file
  }
};

module.exports = connectToDatabase;
