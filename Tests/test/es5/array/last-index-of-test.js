var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.lastIndexOf ", () => {
      assert([1, 2, 2].lastIndexOf(2) === 2);
    });
  });
});
