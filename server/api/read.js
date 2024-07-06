const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");

// Route to retrieve all notes
router.post("/api/read", async (req, res) => {
  const { id } = req.body;
  console.log(id);
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
