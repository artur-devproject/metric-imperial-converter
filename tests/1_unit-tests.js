const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("whole number input", function () {
        assert.equal(convertHandler.getNum('3gal'), 3);
    });

    test("decimal number input", function () {
        assert.equal(convertHandler.getNum('3.5gal'), 3.5);
    });

    test("fractional input", function () {
        assert.equal(convertHandler.getNum('3/5gal'), 0.6);
    });

    test("fractional input with a decimal", function () {
        assert.equal(convertHandler.getNum('3.5/10gal'), 0.35);
    });

    test("return an error on a double-fraction", function () {
        assert.equal(convertHandler.getNum('3/2/3'), null);
    });

    test("default to a numerical input of 1 when no numerical input is provided", function () {
        assert.equal(convertHandler.getNum(''), 1);
    });

    test("read each valid input unit", function () {
        assert.equal(convertHandler.getUnit('25mi'), 'mi');
    });

    test("error for an invalid input unit", function () {
        assert.equal(convertHandler.getUnit('25mix'), null);
    });

    test("correct return unit for each valid input unit", function () {
        assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    });

    test("spelled-out string unit for each valid input unit", function () {
        assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    });

    test("correctly convert gal to L", function () {
        assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
    });

    test("correctly convert L to gal", function () {
        assert.equal(convertHandler.convert(1, 'l'), 0.26417);
    });

    test("correctly convert mi to km", function () {
        assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
    });

    test("correctly convert km to mi", function () {
        assert.equal(convertHandler.convert(1, 'km'), 0.62137);
    });

    test("correctly convert lbs to kg", function () {
        assert.equal(convertHandler.convert(10, 'lbs'), 4.53592);
    });

    test("correctly convert kg to lbs", function () {
        assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
    });
});