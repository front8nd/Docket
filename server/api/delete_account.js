const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");
const authMiddleware = require("../middleware/auth");

// Route to delete note by ID
router.delete("/api/acc_delete", authMiddleware, async (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  try {
    // Find user
    const user = await UsersModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Verify user, Note needed since we are using middleware

    // if (note.userId.toString() !== userId) {
    //   return res.status(403).json({ success: false, message: "Unauthorized" });
    // }

    // Delete all ntoes then user ID
    await notesModel.deleteMany({ _id: id });

    await UsersModel.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account and all notes deleted successfully",
    });
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
