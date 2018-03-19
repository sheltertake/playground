var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    it("Array.prototype.forEach ", () => {
      let target = [{}, {}];
      target.forEach(o => (o.Name = "Max"));
      assert.deepEqual(target, [{ Name: "Max" }, { Name: "Max" }]);
    });
  });
});
