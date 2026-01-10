const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.get("/api/catalog", (req, res) => {
  const data = fs.readFileSync("catalog.json");
  res.json(JSON.parse(data));
});

// Admin update catalog
app.post("/api/catalog", (req, res) => {
  const catalog = req.body;
  fs.writeFileSync("catalog.json", JSON.stringify(catalog, null, 2));
  res.json({ status: "ok" });
});

// Upload image
app.post("/api/upload", upload.single("photo"), (req, res) => {
  res.json({ path: "images/" + req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
