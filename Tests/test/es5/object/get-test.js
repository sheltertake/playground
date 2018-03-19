// var assert = require('assert');
var assert = require("chai").assert;
var obj = require("../../../libs/es5/obj-ext");

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object", function() {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
    it("getter", function() {
      assert.equal(obj.Prop, 1);
      assert.equal(obj.Prop, 2);
    });
  });
});
