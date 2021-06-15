const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = require('./routes/routes');

// Initialize App
const app = express();
app.multer = multer;
app.path = path;

// Check Write Permission
fs.access(__dirname, fs.constants.W_OK, (err) => {
  if (err) {
      console.log(`Need File Write permission`);
      process.exit();
  }
  else{
    // Server Listening on Default port 3000
    app.listen(3000, () => {
      console.log(`${new Date()} Server running at http://localhost:3000`);
    });
  }
});

class Server {
  constructor() {
    // Routes Initialization
    const router_object = new router(app);
    router_object.init();
  }
}

// Server Initialization
new Server();

module.exports = app;