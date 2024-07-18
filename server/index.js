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
const readRoute = require("./api/CRUD/read");
const createRoute = require("./api/CRUD/create");
const deleteRoute = require("./api/CRUD/delete");
const updateRoute = require("./api/CRUD/update");

const loginRoute = require("./api/Account/login");
const registerRoute = require("./api/Account/register");
const updatePassword = require("./api/Account/change_password");
const updateEmail = require("./api/Account/change_email");
const deleteAccount = require("./api/Account/delete_account");

// // Flag to track database connection status
// let isDBConnected = false;

// // Middleware to check database connection
// const checkDBConnection = (req, res, next) => {
//   if (isDBConnected) {
//     next();
//   } else {
//     res.status(503).json({
//       error: "Service Temporarily Unavailable: Connecting to database",
//     });
//   }
// };

// // Retry connection to the database with exponential backoff
// const connectWithRetry = (retries = 5, delay = 2000) => {
//   connectToDB()
//     .then(() => {
//       console.log("Database connected successfully");
//       isDBConnected = true;

//       // CRUD Routes
//       app.use(readRoute);
//       app.use(createRoute);
//       app.use(deleteRoute);
//       app.use(updateRoute);

//       app.use(loginRoute);
//       app.use(registerRoute);

//       // Handle unexpected errors
//       app.use((err, req, res, next) => {
//         console.error("Unexpected error", err);
//         res.status(500).json({ error: "An unexpected error occurred" });
//       });

//       // Start the server
//       const PORT = process.env.PORT || 3000;
//       app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//       });
//     })
//     .catch((error) => {
//       console.error(
//         `Database connection failed. Retrying in ${delay / 1000} seconds...`,
//         error
//       );
//       if (retries > 0) {
//         setTimeout(() => connectWithRetry(retries - 1, delay * 2), delay);
//       } else {
//         console.error(
//           "Could not connect to the database after multiple attempts. Exiting."
//         );
//         process.exit(1);
//       }
//     });
// };

// // Apply the database connection check middleware to all routes
// app.use(checkDBConnection);

// // Start trying to connect to the database
// connectWithRetry();

connectToDB();
// CRUD Routes
app.use(readRoute);
app.use(createRoute);
app.use(deleteRoute);
app.use(updateRoute);

app.use(loginRoute);
app.use(registerRoute);

app.use(updatePassword);
app.use(updateEmail);
app.use(deleteAccount);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
