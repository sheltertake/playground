var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Enhanced Object Literals", () => {
    it("es5 getter and setter recap", () => {
      var o = {
        __id: 10,
        get id() {
          return this.__id++;
        },
        set id(v) {
          this.__id = v;
        }
      };
      assert(o.id === 10); // 10
      assert(o.id === 11); // 11
      o.id = 20;
      assert(o.id === 20); // 20
      // and:
      assert(o.__id === 21); // 21
      assert(o.__id === 21); // 21--still!
    });
  });
});
