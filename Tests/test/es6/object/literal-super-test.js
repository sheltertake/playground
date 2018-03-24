var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Enhanced Object Literals", () => {
    it("super", () => {
      var o1 = {
        foo() {
          return "o1:foo";
        }
      };
      var o2 = {
        foo() {
          return super.foo() + "|" + "o2:foo";
        }
      };

      Object.setPrototypeOf(o2, o1);
      assert(o2.foo() === "o1:foo|o2:foo");
    });

    // super is only allowed in concise methods, not
    // regular function expression properties. It also is
    // only allowed in super.XXX form (for property/
    // method access), not in super() form.
    it("super is not usable in regular function properties", () => {
      var o1 = {
        foo: function() {
          return "o1:foo";
        }
      };
      var o2 = {
        foo: function() {
          assert.throws(() => eval("super.foo()"));
        }
      };

      Object.setPrototypeOf(o2, o1);
    });
  });
});
