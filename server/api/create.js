const express = require("express");
const router = express.Router();
const notesModel = require("../models/notes");

//'create' : if only base path is defined in index (1)
//'/' : if full path is defined in index (2)
//if no path is defined in index, we use '/api/create' (3)
router.post("/api/create", async (req, res) => {
  try {
    const { id, title, content, date, color, userId } = req.body;
    const newNote = new notesModel({ userId, id, title, content, date, color });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate id" });
    }
    res.status(400).json({ message: "Validation error", error: err.message });
  }
});

module.exports = router;
