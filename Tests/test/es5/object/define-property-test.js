// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it("Object.defineProperty()	Adds the named property described by a given descriptor to an object", () => {
      "use strict";
      const object1 = {};

      Object.defineProperty(object1, "property1", {
        value: 42,
        writable: false
      });
      assert(object1.property1 === 42);
      assert.throws(() => {
        object1.property1 = 77;
      }); // throws an error in strict mode
      assert(object1.property1 === 42);
    });

    it(
      "Object.defineProperties()	Adds the named properties described " +
        "by the given descriptors to an object",
      () => {
        const object1 = {};

        Object.defineProperties(object1, {
          property1: {
            value: 42,
            writable: true
          },
          property2: {}
        });

        assert(object1.property1 === 42);
        assert(object1.property2 === undefined);
      }
    );
  });
});
