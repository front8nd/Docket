const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");
const authMiddleware = require("../middleware/auth");

// Route to retrieve all notes
router.post("/api/read", authMiddleware, async (req, res) => {
  // the jwt token is based on userID, but here we are using userID to retrive notes, since this token is in our req.headers.
  // Authtication is based on JWT while Authorization is directly using userId, best approch is to use only jwt

  const { id } = req.body;
  try {
    const allNotes = await notesModel.find({ userId: id });
    res.status(200).json({ success: true, data: allNotes });
  } catch (err) {
    console.error("Error retrieving notes:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
