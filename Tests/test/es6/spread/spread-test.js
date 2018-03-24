var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Spread", () => {
    it("array and spread", () => {
      function foo(x, y, z) {
        assert(x === 1);
        assert(y === 2);
        assert(z === 3);
      }
      foo(...[1, 2, 3]);

      //In this usage, ... acts to give us a simpler syntactic replacement for
      // the apply(..) method, which we would typically have used pre-ES6
      foo.apply(null, [1, 2, 3]);
    });

    it("spread like array concat", () => {
      // In this usage, ... is basically replacing concat(..), as it behaves
      // like  ) here.
      var a = [2, 3, 4];
      var b = [1, ...a, 5];
      assert.deepEqual(b, [1, 2, 3, 4, 5]);
      assert.deepEqual([1, ...a, 5], [1].concat(a, [5]));

      function foo(x, y, ...z) {
        assert.deepEqual(z, [3, 4, 5]);
      }
      foo(1, 2, 3, 4, 5); // 1 2 [3,4,5]
    });

    it("spread as rest parameter", () => {
      // The ...args in the foo(..) function declaration
      // is usually called “rest parameters,” because
      // you’re collecting the rest of the parameters. I
      // prefer “gather,” because it’s more descriptive of
      // what it does rather than what it contains.
      function foo(...args) {
        assert.deepEqual(args, [1, 2, 3, 4, 5]);
      }
      foo(1, 2, 3, 4, 5);
    });

    it("spread as rest parameter is a true array", () => {
      // The best part about this usage is that it provides a very solid alternative
      // to using the long-since-deprecated arguments array—actually,
      // it’s not really an array, but an array-like object.

      // doing things the new ES6 way
      function foo(...args) {
        // `args` is already a real array
        // discard first element in `args`
        assert(1 === args.shift());
        // pass along all of `args` as arguments
        // to `console.log(..)`
        assert.deepEqual(args, [2, 3, 4, 5]);
      }
      foo(1, 2, 3, 4, 5);
      // doing things the old-school pre-ES6 way
      function bar() {
        // turn `arguments` into a real array
        var args = Array.prototype.slice.call(arguments);
        // add some elements on the end
        args.push(4, 5);
        // filter out odd numbers
        args = args.filter(function(v) {
          return v % 2 == 0;
        });
        return args;
      }
      assert.deepEqual(bar(0, 1, 2, 3), [0, 2, 4]); // 2 4
    });
  });
});
