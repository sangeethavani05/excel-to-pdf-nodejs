const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = require('./routes/routes');


// Initialize App
const app = express();

// Create Folders to Upload
const XLSXfolderName = 'xlsx-files';
const PDFfolderName = 'pdf-files';
try {
  if (!fs.existsSync(XLSXfolderName)) {
    fs.mkdirSync(XLSXfolderName);
  }
  if (!fs.existsSync(PDFfolderName)) {
    fs.mkdirSync(PDFfolderName);
  }
} catch (err) {
  console.error(err);
}

// To Upload File
let upload = multer({ dest: '/xlsx-files' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'xlsx-files');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
upload = multer({ storage: storage });

// Build App
app.upload = upload;
app.path = path;

class Server {
  constructor() {
    // Routes Initialization
    const router_object = new router(app);
    router_object.init();
  }
}

// Server Initialization
new Server();

// Server Listening on Default port 3000
app.listen(3000, () => {
  console.log(`${new Date()} Server running at http://localhost:3000 `);
});

module.exports = app;