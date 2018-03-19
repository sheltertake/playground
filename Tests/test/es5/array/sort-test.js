var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.sort: compareFn must be function or undefined", () => {
      assert.deepEqual([2, 4, 3].sort(), [2, 3, 4]);
      assert.deepEqual([2, 4, 3].sort((a, b) => a > b), [2, 3, 4]);
    });
    it("Array.prototype.sort: compareFn may be explicit undefined", () => {
      assert.deepEqual([2, 4, 3].sort(undefined), [2, 3, 4]);
    });
  });
});
