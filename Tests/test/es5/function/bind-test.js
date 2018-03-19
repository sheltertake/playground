// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("Function bind", () => {
    //The bind() method creates a new function that, when called, has its this keyword
    // set to the provided value,
    // with a given sequence of arguments preceding any provided when the new function is called.
    var module = {
      x: 42,
      getX: function() {
        return this.x;
      },
      sum: function(y, z) {
        return this.x + y + z;
      }
    };

    var retrieveX = module.getX;
    assert(retrieveX() === undefined); // The function gets invoked at the global scope
    var refSum = module.sum;
    assert(isNaN(refSum()) === true); // The function gets invoked at the global scope
    // expected output: undefined

    var boundGetX = retrieveX.bind(module);
    assert(boundGetX() === 42);
    assert(retrieveX.bind(module)() === 42);
    assert(retrieveX.apply(module) === 42);
    assert(retrieveX.call(module) === 42);
    // expected output: 42

    assert(refSum.bind(module, 10, 10)() === 62);
    assert(refSum.apply(module, [10, 10]) === 62);
    assert(refSum.call(module, 10, 10) === 62);
  });
});
