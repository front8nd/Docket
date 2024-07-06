const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: String,
  content: String,
  date: Date,
  color: String,
});

const notesModel = mongoose.model("Notes", notesSchema);

module.exports = notesModel;
