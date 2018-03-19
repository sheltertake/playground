// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object", function() {
    it("trailing comma didnt throw", function() {
      assert({ a: true }.a === true);
      assert([1].length === 1);
    });

    it("Reserved words as property names", function() {
      assert({ if: 1 }.if === 1, "if is reserved word");
    });
  });
});
