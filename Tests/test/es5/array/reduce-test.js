var assert = require("chai").assert;
describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("array static methods", () => {
    // The reduce() method applies a function against an accumulator
    // and each element in the array (from left to right) to reduce it to a single value.
    it("Array.prototype.reduce ", () => {
      const array1 = [1, 2, 3, 4];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      // 1 + 2 + 3 + 4
      //console.log(array1.reduce(reducer));
      assert(
        [1, 2, 3, 4].reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ) === 10
      );
      // expected output: 10

      // 5 + 1 + 2 + 3 + 4
      //console.log(array1.reduce(reducer, 5));
      assert(
        [1, 2, 3, 4].reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 5) === 15
      );
      // expected output: 15
    });
  });
});
