var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.filter ", () => {
      var origin = [1, 4, 9, 16];
      assert(origin.filter(x => x === 1).length === 1);
    });
  });
});
