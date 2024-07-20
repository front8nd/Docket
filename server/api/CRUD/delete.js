const express = require("express");
const router = express.Router();
const notesModel = require("../../models/notes");
const authMiddleware = require("../../middleware/auth");

// Route to delete note by ID
router.delete("/api/delete", authMiddleware, async (req, res) => {
  const { userId, id } = req.body;
  try {
    const note = await notesModel.findOne({ _id: id });

    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    if (note.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete this note" });
    }
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
