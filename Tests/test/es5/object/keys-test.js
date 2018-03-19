// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it("Object.keys()	Returns an array of all enumerable properties on an object", () => {
      // simple array
      var arr = ["a", "b", "c"];
      assert.deepEqual(Object.keys(arr), ["0", "1", "2"]);

      // array like object
      var obj = { 0: "a", 1: "b", 2: "c" };
      assert.deepEqual(Object.keys(obj), ["0", "1", "2"]);

      // array like object with random key ordering
      var anObj = { 100: "a", 2: "b", 7: "c" };
      assert.deepEqual(Object.keys(anObj), ["2", "7", "100"]);

      // getFoo is a property which isn't enumerable
      var myObj = Object.create(
        {},
        {
          getFoo: {
            value: function() {
              return this.foo;
            }
          },
          prop1: {
            value: 1,
            enumerable: true
          }
        }
      );
      myObj.foo = 1;
      assert.deepEqual(Object.keys(myObj), ["prop1", "foo"]);
      //If you want all properties, even non-enumerables, see Object.getOwnPropertyNames().
    });
  });
});
