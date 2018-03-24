var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("String Templates", () => {
    it("interpolated string literals - es5", () => {
      var name = "Kyle";
      var greeting = "Hello " + name + "!";
      assert(greeting === "Hello Kyle!");
      assert(typeof greeting === "string");
    });
    it("interpolated string literals - es6", () => {
      // Now, consider the new ES6 way:
      var name = "Kyle";
      var greeting = `Hello ${name}!`;
      assert(greeting === "Hello Kyle!");
      assert(typeof greeting === "string");
    });
    it("string templates - multiline", () => {
      //         One really nice benefit of interpolated string literals is they are
      // allowed to split across multiple lines:
      var text = `Now is the time for all good men
to come to the aid of their
country!`;
      //console.log(text);
    });

    it("Interpolated Expressions", () => {
      // Any valid expression is allowed to appear inside ${..} in an interpolated
      // string literal, including function calls, inline

      function upper(s) {
        return s.toUpperCase();
      }
      var who = "reader";
      var text = `A very ${upper("warm")} welcome
        Template Literals | 49
        to all of you ${upper(`${who}s`)}!`;

      assert(text.startsWith("A very WARM"));
      // A very WARM welcome
      // to all of you READERS!
    });
    it("Interpolated Expressions - scope", () => {
      function foo(str) {
        var name = "foo";
        // console.log(str);
        return str;
      }
      function bar() {
        var name = "bar";
        return foo(`Hello from ${name}!`);
      }
      var name = "global";
      //   One quick note about the scope that is used to resolve variables in
      //   expressions. I mentioned earlier that an interpolated string literal is
      //   kind of like an IIFE, and it turns out thinking about it like that
      //   explains the scoping behavior as well.
      assert(bar() === "Hello from bar!");
      assert(bar() !== "Hello from foo!");
    });

    it("template toString conversion", () => {
      var a = {
        toString: function() {
          return "foo";
        },
        valueOf: function() {
          return "bar";
        }
      };
      assert(`${a}` === "foo");
    });
  });
});
