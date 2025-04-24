const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  originalName: String,
  storedName: String,
  path: String,
  size: Number,
  type: String,
  uploadedAt: Date,
  // uploader: String,
});

const File = mongoose.model("File", FileSchema);

module.exports = File;
