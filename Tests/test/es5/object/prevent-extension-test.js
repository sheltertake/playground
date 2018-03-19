// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it("Object.preventExtensions()	Prevents any extensions of an object", () => {
      "use strict";
      const object1 = {};

      Object.preventExtensions(object1);

      assert.throws(() => {
        Object.defineProperty(object1, "property1", {
          value: 42
        });
      });
      assert.throws(() => {
        object1.pippo = 1; //only in  "use strict";
      });
    });
  });

  it("Object.isExtensible()	Determine if extending of an object is allowed", () => {
    const object1 = {};

    assert(Object.isExtensible(object1) === true);
    // expected output: true

    Object.preventExtensions(object1);

    assert(Object.isExtensible(object1) === false);
    // expected output: false
  });
});
