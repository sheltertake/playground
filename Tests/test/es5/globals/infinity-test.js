// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  it("The global Infinity property is a numeric value representing infinity", () => {
    assert(Math.pow(10, 1000) === Infinity);
    assert(1 / 0 === Infinity);
    assert(1 / Infinity === 0);
  });
});
