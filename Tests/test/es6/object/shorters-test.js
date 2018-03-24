var assert = require("chai").assert;
describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  //skipped: bad parts
  // computed properties
  // computed shorthand methods
  // computed accessors

  describe("Enhanced Object Literals", () => {
    it("Concise/Shorthand Properties", () => {
      var x = 2,
        y = 3,
        o = {
          x: x,
          y: y
        };

      var x2 = 2,
        y2 = 3,
        o2 = {
          x2,
          y2
        };

      assert.deepEqual(x, x2);
    });
    it("Concise/Shorthand Methods (string-keyed shorthand methods)", () => {
      {
        var o = {
          x: function() {
            // ..
          },
          y: function() {
            // ..
          }
        };
        // So what are we left to conclude about concise methods? They’re
        // short and sweet, and a nice convenience. But you should only use
        // them if you’re never going to need them to do recursion or event
        // binding/unbinding.
        var o = {
          x() {
            // ..
          },
          y() {
            // ..
          }
        };
      }
    });
  });
});
