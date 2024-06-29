const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");

// Route to delete note by ID
router.delete("/api/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const deleteNote = await notesModel.deleteOne({ _id: id });
    res.status(200).json({ success: true, data: deleteNote });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

module.exports = router;
