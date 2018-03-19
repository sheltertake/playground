var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    //method creates a new array with the results
    //of calling a provided function on every element in the calling array
    it("Array.prototype.map  ", () => {
      var origin = [1, 4, 9, 16];
      var target = origin.map(x => x * 2);
      assert.deepEqual(origin, [1, 4, 9, 16]);
      assert.deepEqual(target, [2, 8, 18, 32]);
    });
  });
});
