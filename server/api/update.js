const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");
const authMiddleware = require("../middleware/auth");

// Route to delete note by ID
router.put("/api/update", authMiddleware, async (req, res) => {
  const { userId, id, title, content } = req.body;
  try {
    const updatedNote = await notesModel.findOneAndUpdate(
      { _id: id, userId: userId },
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found or unauthorized" });
    }
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
