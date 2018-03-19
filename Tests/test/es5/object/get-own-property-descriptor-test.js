// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it(
      "Object.getOwnPropertyDescriptor()	Returns a property descriptor for a " +
        "named property on an object",
      () => {
        const object1 = {
          property1: 42
        };

        const descriptor1 = Object.getOwnPropertyDescriptor(
          object1,
          "property1"
        );

        assert(descriptor1.configurable === true);
        // expected output: true

        assert(descriptor1.value === 42);
        // expected output: 42
      }
    );
  });
});
