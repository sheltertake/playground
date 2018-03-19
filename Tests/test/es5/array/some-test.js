var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.some ", () => {
      assert([true, false].some(x => x) === true);
      assert([1, 2].some(x => x > 1) === true);
      assert([1, 2].some(x => x > 2) === false);
    });
  });
});
