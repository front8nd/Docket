const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");

// Route to delete note by ID
router.put("/api/update", async (req, res) => {
  const { id, title, content } = req.body;
  try {
    const updatedNote = await notesModel.findByIdAndUpdate(id, {
      title: title,
      content: content,
    });
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
