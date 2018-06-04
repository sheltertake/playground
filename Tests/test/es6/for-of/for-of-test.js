var assert = require("chai").assert;

describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  it("For Of iterate iterable values", () => {
    // Joining the for and for..in loops from the JavaScript we’re all
    // familiar with, ES6 adds a for..of loop, which loops over the set of
    // values produced by an iterator.

    // The value you loop over with for..of must be an iterable, or it must
    // be a value that can be coerced/boxed to an object (see the Types &
    // for..of Loops | 61
    // Grammar title of this series) that is an iterable.

    var a = ["a", "b", "c", "d", "e"];
    function forIn() {
      var ret = [];
      for (var idx in a) {
        // console.log(idx);
        ret.push(idx);
      }
      return ret;
    }
    // 0 1 2 3 4
    assert.deepEqual(forIn(), ["0", "1", "2", "3", "4"]);

    function forOf() {
      var ret = [];
      for (var val of a) {
        // console.log(val);
        ret.push(val);
      }
      return ret;
    }
    // "a" "b" "c" "d" "e"
    assert.deepEqual(forOf(), ["a", "b", "c", "d", "e"]);

    //pre es6 alternative
    var k = Object.keys(a);
    function forOfEs5() {
      var ret = [];
      for (var val, i = 0; i < k.length; i++) {
        ret.push(a[k[i]]);
        // console.log(val);
      }
      return ret;
    }
    assert.deepEqual(forOfEs5(), ["a", "b", "c", "d", "e"]);
    // "a" "b" "c" "d" "e"

    //es6 not for-of alternative
    function forOfEs6Alternative() {
      var ret = [];
      var iterator = (it = a[Symbol.iterator]());
      for (var nextValue; (nextValue = iterator.next()) && !nextValue.done; ) {
        ret.push(nextValue.value);
      }
      return ret;
    }
    assert.deepEqual(forOfEs6Alternative(), ["a", "b", "c", "d", "e"]);
  });

  // Standard built-in values in JavaScript that are by default iterables (or
  //     provide them) include:
  //     • Arrays
  //     • Strings
  //     • Generators (see Chapter 3)
  //     • Collections / TypedArrays (see Chapter 5)
  it("Standard built-in iterables - arrays", () => {
    var a = ["a", "b", "c", "d", "e"];
    function forOf() {
      var ret = [];
      for (var val of a) {
        // console.log(val);
        ret.push(val);
      }
      return ret;
    }
    // "a" "b" "c" "d" "e"
    assert.deepEqual(forOf(), ["a", "b", "c", "d", "e"]);
  });
  it("Standard built-in iterables - strings", () => {
    var a = "foo";
    function forOf() {
      var ret = [];
      for (var val of a) {
        // console.log(val);
        ret.push(val);
      }
      return ret;
    }
    // "a" "b" "c" "d" "e"
    assert.deepEqual(forOf(), ["f", "o", "o"]);
  });
});
