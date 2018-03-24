var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Default parameters", () => {
    it("set default value in es5 and pass 0", () => {
      function foo(x, y) {
        x = x || 11;
        y = y || 31;
        return x + y;
      }
      assert(foo() === 42); // 42
      assert(foo(5, 6) === 11); // 11
      assert(foo(5) === 36); // 36
      assert(foo(null, 6) === 17); // 17

      //  Of course, if you’ve used this pattern before, you know that it’s both
      // helpful and a little bit dangerous if, for example, you need to be able
      // to pass in what would otherwise be considered a falsy value for one
      // of the parameters. Consider:
      assert(foo(0, 42) === 53); // 53 <-- Oops, not 42
    });
    it("set default value checking undefined", () => {
      //  To fix this gotcha, some people will instead write the check more
      // verbosely like this:
      function foo(x, y) {
        x = x !== undefined ? x : 11;
        y = y !== undefined ? y : 31;
        return x + y;
      }
      assert(foo(0, 42) === 42); // 42
      assert(foo(undefined, 6) === 17); // 17
    });
    it("default parameter in es6", () => {
      function foo(x = 11, y = 31) {
        return x + y;
      }
      assert(foo() === 42); // 42
      assert(foo(5, 6) === 11); // 11
      assert(foo(0, 42) === 42); // 42
      assert(foo(5) === 36); // 36

      // x = 11 in a function declaration is more like x !== undefined ?
      // x : 11 than the much more common idiom x || 11, so you’ll need
      // to be careful in converting your pre-ES6 code to this ES6 default
      // parameter value syntax.
      assert(foo(5, undefined) === 36); // 36 <-- `undefined` is missing
      assert(foo(5, null) === 5); // 5 <-- null coerces to `0`
      assert(foo(undefined, 6) === 17); // 17 <-- `undefined` is missing
      assert(foo(null, 6) === 6); // 6 <-- null coerces to `0`
    });

    it("default value expression", () => {
      function bar(val) {
        // console.log("bar called!");
        return y + val;
      }
      function foo(x = y + 3, z = bar(x)) {
        // console.log(x, z);
        // console.log(x + z);
        return x + z;
      }
      var y = 5;
      assert(foo() === 21); // 8 (y + 3)  + 13 (8 + 5)
      assert(foo(10) === 25); // 10 (10) 15 (10 + 5)

      y = 6;
      assert(foo(undefined, 10) === 19); // 9 (6 + 3) 10 (10)
    });
  });
});
