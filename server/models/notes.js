const mangoose = require("mongoose");

const notesSchema = new mangoose.Schema({
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

// Notes is collection name inside the database
const notesModel = mangoose.model("Notes", notesSchema);

module.exports = notesModel;
