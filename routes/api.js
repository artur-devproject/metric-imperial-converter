'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res, next) => {
    let input = req.query.input;
    if(!input) return next();
    let result;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit;
    let returnNum;
    if(!initNum && !initUnit) {
      result = "invalid number and unit";
    } else if(!initNum) {
      result = "invalid number";
    } else if(!initUnit) {
      result = "invalid unit";
    } else {
      returnUnit = convertHandler.getReturnUnit(initUnit);
      returnNum = convertHandler.convert(initNum, initUnit);
      result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    };
    res.json(result);
  });

};
