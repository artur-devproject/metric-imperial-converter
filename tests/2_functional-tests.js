const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert a valid input such as 10L: GET request to /api/convert', function (done) {
        let text = '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}';
        chai
          .request(server)
          .get('/api/convert?input=10L')
          .end(function (req, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, text);
            done();
          });
    });

    test('Convert an invalid input such as 32g: GET request to /api/convert', function (done) {
        let text = '"invalid unit"';
        chai
          .request(server)
          .get('/api/convert?input=32g')
          .end(function (req, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, text);
            done();
          });
    });

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function (done) {
        let text = '"invalid number"';
        chai
          .request(server)
          .get('/api/convert?input=3/7.2/4kg')
          .end(function (req, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, text);
            done();
          });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function (done) {
        let text = '"invalid number and unit"';
        chai
          .request(server)
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end(function (req, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, text);
            done();
          });
    });

    test('Convert with no number such as kg: GET request to /api/convert', function (done) {
        let text = '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}';
        chai
          .request(server)
          .get('/api/convert?input=kg')
          .end(function (req, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, text);
            done();
          });
    });
});
