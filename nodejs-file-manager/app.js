const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const multer = require("multer");

const connectDB = require("./config/db");
const File = require("./models/FileModel.model");

const dotenv = require("dotenv");
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// download a specific file
// app.get("/files/:id");

// delete file and metadata - using node fs
// app.delete("/files/:id");

// get files
app.get("/files", async (req, res) => {
  try {
    const files = await File.find({});

    res.status(200).json({
      success: true,
      data: files,
    });
  } catch (error) {
    // Handle errors (e.g., DB errors)
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching files" });
  }
});

// Make directory for file

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
// Multer disk storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, file.originalname + "_" + Date.now() + ext);
  },
});

// Define maximum upload file size (~95 MB)
const maxSize = 10 * 10000 * 1000;

// Configure Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("myfile");

// upload single file
app.post("/upload", (req, res, next) => {
  // Use Multer middleware to handle file upload
  upload(req, res, function (err) {
    if (err) {
      // Handle errors during file upload
      res.send(err);
    } else {
      // Success message after a successful upload
      const fileSaved = new File({
        originalName: req.file.originalname,
        storedName: req.file.filename,
        path: req.file.path,
        type: req.file.mimetype,
        size: req.file.size,
        uploadedAt: new Date(),
      });

      fileSaved.save().then(() => {
        console.log("File saved in DB");
      });

      res.status(201).json("Success, File uploaded!");
    }
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`File Server running on http://localhost:${PORT}`);
});
