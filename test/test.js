const request = require('supertest');
const app = require('../index')

describe('Test Functions', function() {

    it('API: /', function(done) {
        request(app)
          .get('/')
          .expect(200, done);
    });

    it('API: /upload', function(done) {
      request(app)
        .post('/upload')
        .attach('file','../sample.xlsx')
        // .set('type','multipart/form-data')
        // .set({"Accept-Encoding": "*"})
        .expect(200, done);
    });
  });