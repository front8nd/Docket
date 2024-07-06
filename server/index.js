// index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./db/conn"); // Import the DB connection function

// Load environment variables from .env file if not in production
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Create an instance of Express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use cors middleware with options
app.use(cors());

// All Routes
const readRoute = require("./api/read");
const createRoute = require("./api/create");
const deleteRoute = require("./api/delete");
const updateRoute = require("./api/update");

const loginRoute = require("./api/login");
const registerRoute = require("./api/register");

// Connect to the database
connectToDB()
  .then(() => {
    console.log("Database connected successfully");

    // CRUD Routes

    app.use(readRoute);
    app.use(createRoute);
    app.use(deleteRoute);
    app.use(updateRoute);

    //app.use(authRoutes);
    app.use(loginRoute);
    app.use(registerRoute);

    // Handle unexpected errors
    app.use((err, req, res, next) => {
      console.error("Unexpected error", err);
      res.status(500).json({ error: "An unexpected error occurred" });
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

module.exports = app;
