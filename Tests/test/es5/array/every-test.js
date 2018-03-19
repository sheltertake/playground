var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.every ", () => {
      assert([true, true].every(x => x) === true);
      assert([1, 1].every(x => x > 0) === true);
      assert([1, 1].every(x => x > 1) === false);
    });
  });
});
