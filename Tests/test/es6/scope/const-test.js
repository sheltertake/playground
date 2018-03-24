var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Scope", () => {
    it("const value type reassign throws", () => {
      {
        const a = 2;
        assert(a === 2); // 2
        assert.throw(x => (a = 3)); // TypeError!
      }
    });
    it("const ref type reassign throws but they are mutable", () => {
      {
        const a = [1, 2, 3];
        a.push(4);
        assert.deepEqual(a, [1, 2, 3, 4]); // [1,2,3,4]
        assert.throw(x => (a = 1)); // TypeError!
      }
    });
  });
});
