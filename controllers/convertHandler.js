const unitSet = require('../units.json');

function ConvertHandler() {

  this.parse = (strExp) => {
    let result;
    if(strExp.includes('/')) {
      let arrExp = strExp.split('/');
      if(arrExp.length==2) {
        const firstElem = Number.parseFloat(arrExp[0]);
        const secondElem = Number.parseFloat(arrExp[1]);
        result = firstElem / secondElem;
      } else {
        result = null;
      };
    } else {
      result = Number.parseFloat(strExp) || 1;
    }
    return result;
  };
  
  this.getNum = function(input) {
    let result;
    number = this.parse(input);
    if(!number) {
      result = null;
    } else {
      result = number > 0 ? number : null;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    let regex = /[a-z]+$/i;
    unit = input.toLowerCase().match(regex)[0];
    result = unitSet[unit] ? unit : null;
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = unitSet[initUnit.toLowerCase()].pair;
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = unitSet[unit.toLowerCase()].spelling;
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let multi = initNum * this.parse(unitSet[initUnit.toLowerCase()].factor);
    let result = (Math.round(multi * 10**5)) / 10**5;
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let stringRes = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    result = {
      "initNum": initNum,
      "initUnit": unitSet[initUnit].name,
      "returnNum": returnNum,
      "returnUnit": returnUnit,
      "string": stringRes
    };
    return result;
  };
  
}

module.exports = ConvertHandler;
