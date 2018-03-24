var assert = require("chai").assert;

describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Scope", () => {
    it("var scope function scope", () => {
      var a = 2;
      (function IIFE() {
        var a = 3;
        assert(a === 3); // 3
      })();
      assert(a === 2);
    });

    it("let - block scope in es6", () => {
      var a = 2;
      {
        let a = 3;
        assert(a === 3);
      }
      assert(a === 2);
    });

    // The answers: the if statement contains b and c block-scoped variables,
    // and the for loop contains i and j block-scoped variables.
    it("let visibilibity inside for", () => {
      let a = 2;
      if (a > 1) {
        let b = a * 3;
        assert(b === 6 && a === 2); // 6
        for (let i = a; i <= b; i++) {
          // da 2 a 6
          let j = i + 10;
          //console.log(j);
          assert(i === i && j === j);
        }
        // 12 13 14 15 16
        let c = a + b;
        assert(c === 8 && a === 2); // 8
        assert.throw(x => i === i); // i is in the for scope
        assert.throw(x => j === j); // j is in the for scope
      }
    });

    it("let - temporal dead zone", () => {
      assert(a === undefined && typeof a === "undefined"); // undefined
      assert.throw(x => b === undefined); // ReferenceError! typeof a === "undefined"
      assert.throw(x => typeof b === "undefined"); // ReferenceError!
      var a;
      let b;
    });
    it("let in for cycle capture value", () => {
      var funcs = [];
      for (let i = 0; i < 5; i++) {
        funcs.push(function() {
          return i; //console.log(i);
        });
      }
      assert(funcs.length === 5);
      // console.log(funcs);
      assert(funcs[3]() === 3); // 3

      //var
      var funcs2 = [];
      for (var i = 0; i < 5; i++) {
        funcs2.push(function() {
          //console.log(i);
          return i;
        });
      }
      assert(funcs2.length === 5);
      // console.log(funcs);
      assert(funcs2[3]() === 5); // should be 3 logically

      //let
      var funcs3 = [];
      for (var i = 0; i < 5; i++) {
        let j = i;
        funcs3.push(function() {
          return j; //console.log(j);
        });
      }
      assert(funcs3[3]() === 3); // let inside for capture value

      //using var i should wrap inside closure
      var funcs4 = [];
      for (var i = 0; i < 5; i++) {
        funcs4.push(
          (function(i) {
            return function() {
              return i;
            };
          })(i) //closure capture i
        );
      }
      assert(funcs4[3]() === 3); // let inside for capture value
    });
  });
});
