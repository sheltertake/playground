// var assert = require('assert');
var assert = require('chai').assert;
var obj = require('../libs/es5/obj-ext');

describe('Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011', function () {

  describe('array static methods', () => {
    it('Array.isArray', () => {
      assert(Array.isArray([1, 2, 3]) === true);  // true
      assert(Array.isArray({ foo: 123 }) === false); // false
      assert(Array.isArray('foobar') === false);   // false
      assert(Array.isArray(undefined) === false);  // false
    });
    it('Array.prototype.indexOf ', () => {
      assert([1, 2].indexOf(2) === 1);
    });
    it('Array.prototype.lastIndexOf ', () => {
      assert([1, 2, 2].lastIndexOf(2) === 2);
    });
    it('Array.prototype.every ', () => {
      assert([true, true].every(x => x) === true);
      assert([1, 1].every(x => x > 0) === true);
      assert([1, 1].every(x => x > 1) === false);
    });
    it('Array.prototype.some ', () => {
      assert([true, false].some(x => x) === true);
      assert([1, 2].some(x => x > 1) === true);
      assert([1, 2].some(x => x > 2) === false);
    });
    it('Array.prototype.forEach ', () => {
      let target = [{}, {}];
      target.forEach(o => o.Name = "Max");
      assert.deepEqual(target, [{ Name: "Max" }, { Name: "Max" }]);
    });
    //method creates a new array with the results 
    //of calling a provided function on every element in the calling array
    it('Array.prototype.map  ', () => {
      var origin = [1, 4, 9, 16];
      var target = origin.map(x => x * 2);
      assert.deepEqual(origin, [1, 4, 9, 16]);
      assert.deepEqual(target, [2, 8, 18, 32]);
    });
    it('Array.prototype.filter ', () => { 
      var origin = [1, 4, 9, 16];
      assert(origin.filter(x => x === 1).length === 1);
    });
    // The reduce() method applies a function against an accumulator 
    // and each element in the array (from left to right) to reduce it to a single value.
    it('Array.prototype.reduce ', () => { 
      const array1 = [1, 2, 3, 4];
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      
      // 1 + 2 + 3 + 4
      //console.log(array1.reduce(reducer));
      assert([1,2,3,4].reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
      }) === 10)
      // expected output: 10
      
      // 5 + 1 + 2 + 3 + 4
      //console.log(array1.reduce(reducer, 5));
      assert([1,2,3,4].reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 5) === 15)
      // expected output: 15

    });
    it('Array.prototype.reduceRight ', () => { });
    it('Array.prototype.sort: compareFn must be function or undefined', () => { });
    it('Array.prototype.sort: compareFn may be explicit undefined', () => { });
  })

  describe('object', function () {
    describe('extensions', function () {
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
      it('getter', function () {
        assert.equal(obj.Prop, 1);
        assert.equal(obj.Prop, 2);
      });

      it('setter', function () {
        obj.pusharr = "Max"
        assert.equal(obj.arr.length, ["Max"].length);
        obj.pusharr = "Alice";
        assert.equal(obj.arr.length, ["Max", "Alice"].length);
        assert.deepEqual(obj.arr, ["Max", "Alice"])
      });

      it('trailing comma didnt throw', function () {
        assert({ a: true, }.a === true);
        assert([1,].length === 1);
      })

      it('Reserved words as property names', function () {
        assert(({ if: 1 }).if === 1, 'if is reserved word');
      });



    });
  });
});