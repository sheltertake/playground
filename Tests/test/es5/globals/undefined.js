// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  it(
    "The global undefined property represents the primitive value undefined " +
      "It is one of JavaScript's primitive types.",
    () => {
      var a;
      assert(a === undefined);
      assert(b === undefined);
      var b; //hoisting

      // While it is possible to use it as an identifier (variable name) in any scope
      // other than the global scope (because undefined is not a reserved word),
      // doing so is a very bad idea that will make your code difficult to maintain and debug.
      var undefined = "ciao";
      assert(undefined === "ciao");
    }
  );
});
