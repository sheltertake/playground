var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("String Templates - Tags", () => {
    it("tag function", () => {
      function foo(strings, ...values) {
        // console.log(strings);
        // console.log(values);
        assert.deepEqual(strings, ["Everything is ", "!"]);
        assert.deepEqual(values, ["awesome"]);
      }
      var desc = "awesome";
      //       It’s essentially a special kind of function call that doesn’t need the ( .. ).
      var str = foo`Everything is ${desc}!`;
      // [ "Everything is ", "!"]
      // [ "awesome" ]

      //   console.log(str);
      assert(str === undefined); //foo doesn't returns
      //       A tagged string literal is like a processing step after the interpolation
      // expressions are evaluated but before the final string value is compiled,
      // allowing you more control over generating the string from the
      // literal.
    });

    it("tag function - return default interpolation", () => {
      function foo(strings, ...values) {
        return strings.reduce(function(s, v, idx) {
          return s + (idx > 0 ? values[idx - 1] : "") + v;
        }, "");
      }
      var desc = "awesome";
      //       It’s essentially a special kind of function call that doesn’t need the ( .. ).
      var str = foo`Everything is ${desc}!`;
      // [ "Everything is ", "!"]
      // [ "awesome" ]

      //   console.log(str);
      assert(str === "Everything is awesome!"); //foo doesn't returns
      //       A tagged string literal is like a processing step after the interpolation
      // expressions are evaluated but before the final string value is compiled,
      // allowing you more control over generating the string from the
      // literal.
    });
    it("tag function - real world example", () => {
      function dollabillsyall(strings, ...values) {
        return strings.reduce(function(s, v, idx) {
          if (idx > 0) {
            if (typeof values[idx - 1] == "number") {
              // look, also using interpolated
              // string literals!
              s += `$${values[idx - 1].toFixed(2)}`;
            } else {
              s += values[idx - 1];
            }
          }
          return s + v;
        }, "");
      }
      var amt1 = 11.99,
        amt2 = amt1 * 1.08,
        name = "Kyle";
      var text = dollabillsyall`Thanks for your purchase, ${name}! Your
            product cost was ${amt1}, which with tax
            comes out to ${amt2}.`;

      assert(text.indexOf("$11.99") > -1);
      // Thanks for your purchase, Kyle! Your
      // product cost was $11.99, which with tax
      // comes out to $12.95.
    });
    it("tag function - raw strings", () => {
      function showraw(strings, ...values) {
        // console.log(strings);
        // console.log(strings.raw);
        return strings.raw;
      }
      var raws = showraw`Hello\nWorld`;
      // [ "Hello
      // World" ]
      // [ "Hello\nWorld" ]
      //   console.log(raws[0]);
      assert(raws[0], "Hello\\nWorld");
      assert(raws[0], "Hello\nWorld");
    });
    it("tag function - built-in String.raw", () => {
      console.log(`Hello\nWorld`);
      // Hello
      // World
      console.log(String.raw`Hello\nWorld`);
      // Hello\nWorld
      assert(String.raw`Hello\nWorld`.length === 12);
      // 12
    });
  });
});
