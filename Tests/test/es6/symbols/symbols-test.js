var assert = require("chai").assert;

describe("Symbols", () => {
  it("new primitive type Symbol", () => {
    // With ES6, for the first time in quite a while, a new primitive type has
    // been added to JavaScript: the symbol. Unlike the other primitive
    // types, however, symbols don’t have a literal form.
    // Here’s how you create a symbol:
    var sym = Symbol("some optional description");
    assert(typeof sym === "symbol"); // "symbol"
  });
});
