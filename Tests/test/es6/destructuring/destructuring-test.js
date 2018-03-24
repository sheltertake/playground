var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Destructuring Assignment", () => {
    it("es5 destructuring array by index", () => {
      function foo() {
        return [1, 2, 3];
      }
      var tmp = foo(),
        a = tmp[0],
        b = tmp[1],
        c = tmp[2];
      //   console.log(a, b, c); // 1 2 3

      assert(a + b + c === 1 + 2 + 3);
    });
    it("es5 destructuring object", () => {
      function bar() {
        return {
          x: 4,
          y: 5,
          z: 6
        };
      }
      var tmp = bar(),
        x = tmp.x,
        y = tmp.y,
        z = tmp.z;
      //   console.log(x, y, z); // 4 5 6
      assert(x + y + z === 4 + 5 + 6);
    });

    // ES6 adds a
    // dedicated syntax for destructuring, specifically array destructuring
    // and object destructuring. This syntax eliminates the need for the tmp
    // variable in the previous snippets, making them much cleaner. Consider:

    it("es6 destructuring assignaments with arrays", () => {
      function foo() {
        return [1, 2, 3];
      }

      var [a, b, c] = foo();

      //console.log(a, b, c); // 1 2 3
      assert(a + b + c === 1 + 2 + 3);
    });

    it("es6 destructuring with objects", () => {
      function bar() {
        return {
          x: 4,
          y: 5,
          z: 6
        };
      }
      var { x: x, y: y, z: z } = bar();
      //   console.log(x, y, z); // 4 5 6
      assert(x + y + z === 4 + 5 + 6);

      //The syntactic pattern here is source: target
      var { x: bam, y: baz, z: bap } = bar();
      //   console.log(bam, baz, bap); // 4 5 6
      //   console.log(x, y, z); // ReferenceError

      assert(bam + baz + bap === 4 + 5 + 6);
    });

    it("es6 destructuring object - short syntax", () => {
      function bar() {
        return {
          x: 4,
          y: 5,
          z: 6
        };
      }
      var { x, y, z } = bar();
      //   console.log(x, y, z); // 4 5 6
      assert(x + y + z === 4 + 5 + 6);
    });

    it("es6 destructuring array into object props", () => {
      function foo() {
        return [1, 2, 3];
      }

      var o = {};
      [o.a, o.b, o.c] = foo();
      //   console.log(o.a, o.b, o.c); // 1 2 3
      assert(o.a + o.b + o.c === 1 + 2 + 3);
    });
    it("repeated assignments", () => {
      var { a: X, a: Y } = { a: 1 };
      assert(X === 1 && Y === 1);
    });
    it("destructure sub object", () => {
      // That also means you can both destructure a sub-object/array property
      // and also capture the sub-object/array’s value itself. Consider:
      var { a: { x: X, x: Y }, a } = { a: { x: 1 } };
      assert(X === 1 && Y === 1);
      assert.deepEqual(a, { x: 1 });
    });
    it("destructure values and ref", () => {
      var o = { a: 1, b: 2, c: 3 },
        a,
        b,
        c,
        p;
      p = { a, b, c } = o;
      //   console.log(a, b, c); // 1 2 3
      assert(a === 1 && b === 2 && c === 3);
      assert(p === o); // true
      //   In the previous snippet, p was assigned the o object reference, not
      //   one of the a, b, or c values
    });
    it("destructure and spread operator", () => {
      //       Here we see that ...a is spreading a out, because it appears in the
      // array [ .. ] value position. If ...a appears in an array destructuring
      // position, it performs the gather behavior:
      var a = [2, 3, 4];
      var [b, ...c] = a;
      assert(b === 2);
      assert.deepEqual(c, [3, 4]);
    });

    //       Both forms of destructuring can offer a default value option for an
    // assignment, using the = syntax similar to the default function argument
    // values discussed earlier.
    // Consider:

    it("destructure default values - arrays", () => {
      function foo() {
        return [1, 2, 3];
      }
      var [a = 3, b = 6, c = 9, d = 12] = foo();
      // console.log(a, b, c, d); // 1 2 3 12
      assert(a === 1 && b === 2 && c === 3);
      assert(d === 12); //default value
    });
    it("destructure default values - objects", () => {
      function bar() {
        return {
          x: 4,
          y: 5,
          z: 6
        };
      }
      var { x = 5, y = 10, z = 15, w = 20 } = bar();
      //console.log(x, y, z, w); // 4 5 6 20
      assert(x === 4 && y === 5 && z === 6);
      assert(w === 20); //default value
    });
    it("destructure in parameters - arrays", () => {
      //   Consider array destructuring for parameters:
      function foo([x, y]) {
        return [x, y];
      }
      assert.deepEqual(foo([1, 2]), [1, 2]); // 1 2
      assert.deepEqual(foo([1]), [1, undefined]); // 1 undefined
      assert.deepEqual(foo([]), [undefined, undefined]); // undefined undefined
    });
    it("destructure in parameters - objects", () => {
      //   Object destructuring for parameters works, too:
      function foo({ x, y }) {
        return { x, y };
      }
      assert.deepEqual(foo({ y: 1, x: 2 }), { x: 2, y: 1 }); // 2 1
      assert.deepEqual(foo({ y: 42 }), { x: undefined, y: 42 }); // undefined 42
      assert.deepEqual(foo({}), { x: undefined, y: undefined }); // undefined undefined
    });

    //with astral plane strings ?
    //var c;
    // [c] = "𠮷𠮶";
    // return c === "𠮷";

    it("destructuring with strings", () => {
      var a, b, c;
      [a, b, c] = "ab";
      assert(a === "a" && b === "b" && c === undefined);
    });

    // with sparse arrays
    // var a, b;
    // [a, , b] = [,,,];
    // return a === undefined && b === undefined;

    // with generator instances
    // with generic iterables
    // with instances of generic iterables
    // iterator closing
    // iterable destructuring expression
    // chained iterable destructuring
    // trailing commas in iterable patterns

    // object destructuring with primitives
    // trailing commas in object patterns
    // object destructuring expression
    // parenthesised left-hand-side is a syntax error
    // chained object destructuring
    // throws on null and undefined
    // computed properties
    // nested
    // rest
    // nested rest
    // empty patterns
    // defaults
  });
});
