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

fs.access(__dirname, fs.constants.W_OK, (err) => {
  if (err) {
      console.log('Permission needed to create folder on path: ',__dirname);
  } else {
    try {
      if (!fs.existsSync(XLSXfolderName)) {
        fs.mkdirSync(XLSXfolderName);
      }
      if (!fs.existsSync(PDFfolderName)) {
        fs.mkdirSync(PDFfolderName);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// To Upload File
let upload = multer({ dest: '/xlsx-files' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'xlsx-files');
  },
  onError : function(err, next) {
    console.log('error while uploading file:', err);
    next(err);
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
  console.log(`${new Date()} Server running at http://localhost:3000`);
});

module.exports = app;