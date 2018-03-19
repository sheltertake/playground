// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  // Global objects made read only: The NaN, Infinity, and undefined global objects
  // have been made read only, per the ECMAScript 5 specification
  it("The global NaN property is a value representing Not-A-Number.", () => {
    assert(isNaN(1) === false);
    assert(isNaN("string") === true);
  });
});
