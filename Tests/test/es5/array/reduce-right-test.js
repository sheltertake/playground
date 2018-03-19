var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.reduceRight ", () => {
      assert([100, 4, 2].reduceRight((acc, cur) => acc * cur) === 800);
      assert([100, 4, 2].reduce((acc, cur) => acc * cur) === 800);
    });
  });
});
