// var assert = require('assert');
var assert = require("chai").assert;
var obj = require("../../../libs/es5/obj-ext");

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object", function() {
    it("setter", function() {
      obj.pusharr = "Max";
      assert.equal(obj.arr.length, ["Max"].length);
      obj.pusharr = "Alice";
      assert.equal(obj.arr.length, ["Max", "Alice"].length);
      assert.deepEqual(obj.arr, ["Max", "Alice"]);
    });
  });
});
