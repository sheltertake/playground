// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it("Object.freeze()	Freezes an object: other code cantt delete or change any properties", () => {
      const object1 = {
        property1: 42
      };

      const object2 = Object.freeze(object1);

      object2.property1 = 33;
      // Throws an error in strict mode

      assert(object2.property1 === 42);
      // expected output: 42
    });

    it("Object.isFrozen()	Determine if an object was frozen", () => {
      const object1 = {
        property1: 42
      };

      assert(Object.isFrozen(object1) === false);
      // expected output: false

      Object.freeze(object1);

      assert(Object.isFrozen(object1) === true);
      // expected output: true
    });
  });
});
