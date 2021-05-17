const actions = require('../actions/actions');

class Router{
  constructor(app){
    this.app = app;
    this.actions = new actions(app);
  }

  init() {

    // Home Page
    this.app.get('/', async(req, res) => {
      res.sendFile(this.app.path.join(__dirname,'../pages/index.html'));
    });

    // Success Page
    this.app.get('/success', async(req, res) => {
      res.sendFile(this.app.path.join(__dirname,'../pages/success.html'));
    });

    // Failure Page
    this.app.get('/failure', async(req, res) => {
      res.sendFile(this.app.path.join(__dirname,'../pages/failure.html'));
    });
      
    // File Upload
    this.app.post('/upload', this.app.upload.single('uploadedFile'),async(req, res) => {
      const response = await this.actions.uploadFile(req);
      response == true ? res.redirect('/success') : res.redirect('/failure');
    });
  }
}

module.exports = Router;