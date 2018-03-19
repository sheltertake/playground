// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it("Object.seal()	Prevents other code from deleting properties of an object", () => {
      //"use strict";
      const object1 = {
        property1: 42
      };

      Object.seal(object1);
      object1.property1 = 33;
      assert(object1.property1 === 33);
      // expected output: 33

      delete object1.property1; // cannot delete when sealed
      assert(object1.property1 === 33);
      // expected output: 33
    });

    it("Object.seal()	delete in strict mode throws", () => {
      "use strict";
      const object1 = {
        property1: 42
      };
      Object.seal(object1);
      assert.throws(() => {
        delete object1.property1; // cannot delete when sealed
      });
    });

    it("Object.isSealed()	Determine if an object is sealed", () => {
      const object1 = {
        property1: 42
      };

      assert(Object.isSealed(object1) === false);
      // expected output: false

      Object.seal(object1);

      assert(Object.isSealed(object1) === true);
      // expected output: true
    });
  });
});
