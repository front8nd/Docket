const mongoose = require("mongoose");

//Import ENV only if running locally else use Vercel env variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectToDB;
