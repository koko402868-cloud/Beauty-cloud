const express = require("express");
const fs = require("fs");
const WebSocket = require("ws");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const DATA_FILE = "catalog.json";

// read catalog.json
function readData() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

// save catalog.json
function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// REST API
app.get("/api/catalog", (req, res) => {
  res.json(readData());
});

app.post("/api/catalog", (req, res) => {
  saveData(req.body);
  broadcast(JSON.stringify(req.body));
  res.sendStatus(200);
});

const server = app.listen(3000, () =>
  console.log("Server running on http://192.168.1.40:3000")
);

// WebSocket
const wss = new WebSocket.Server({ server });

function broadcast(msg) {
  wss.clients.forEach(c => {
    if (c.readyState === WebSocket.OPEN) c.send(msg);
  });
}
