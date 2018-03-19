var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.isArray", () => {
      assert(Array.isArray([1, 2, 3]) === true); // true
      assert(Array.isArray({ foo: 123 }) === false); // false
      assert(Array.isArray("foobar") === false); // false
      assert(Array.isArray(undefined) === false); // false
    });
  });
});
