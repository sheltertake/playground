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
      assert([1, 2, 3, 4].reduce((accumulator, currentValue) => accumulator + currentValue) === 10)
      // expected output: 10

      // 5 + 1 + 2 + 3 + 4
      //console.log(array1.reduce(reducer, 5));
      assert([1, 2, 3, 4].reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 5) === 15)
      // expected output: 15

    });
    it('Array.prototype.reduceRight ', () => {
      assert([100, 4, 2].reduceRight((acc, cur) => acc * cur) === 800);
      assert([100, 4, 2].reduce((acc, cur) => acc * cur) === 800);
    });
    it('Array.prototype.sort: compareFn must be function or undefined', () => {
      assert.deepEqual([2, 4, 3].sort(), [2, 3, 4]);
      assert.deepEqual([2, 4, 3].sort((a, b) => a > b), [2, 3, 4]);
    });
    it('Array.prototype.sort: compareFn may be explicit undefined', () => {
      assert.deepEqual([2, 4, 3].sort(undefined), [2, 3, 4]);
    });
  })


  // Global objects made read only: The NaN, Infinity, and undefined global objects 
  // have been made read only, per the ECMAScript 5 specification
  it('The global NaN property is a value representing Not-A-Number.', () => {
    assert(isNaN(1) === false)
    assert(isNaN("string") === true)
  });

  it('The global Infinity property is a numeric value representing infinity', () => {
    assert(Math.pow(10, 1000) === Infinity);
    assert(1 / 0 === Infinity);
    assert(1 / Infinity === 0);
  });
  it('The global undefined property represents the primitive value undefined ' +
    'It is one of JavaScript\'s primitive types.', () => {
      var a;
      assert(a === undefined);
      assert(b === undefined);
      var b;//hoisting

      // While it is possible to use it as an identifier (variable name) in any scope 
      // other than the global scope (because undefined is not a reserved word), 
      // doing so is a very bad idea that will make your code difficult to maintain and debug.
      var undefined = "ciao";
      assert(undefined === "ciao")
    });


  describe('object', function () {

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

  describe('object static methods', () => {

    it('Object.create()	Creates a new object with the specified prototype object and properties', () => {
      function Shape(x, y) {
        this.x = x;
        this.y = y;
      };
      Shape.prototype.Area = function () { return this.x + this.y; };
      assert(new Shape(10, 20).Area() === 30);

      function Rectangle(x, y) {
        this.x = x;
        this.y = y;
      }
      // subclass extends superclass
      Rectangle.prototype = Object.create(Shape.prototype);
      Rectangle.prototype.constructor = Rectangle;
      // Rectangle.prototype = Shape.prototype;
      assert(new Rectangle(10, 30).Area() === 40);
    });


    it('Object.defineProperty()	Adds the named property described by a given descriptor to an object', () => {
      "use strict";
      const object1 = {};

      Object.defineProperty(object1, 'property1', {
        value: 42,
        writable: false
      });
      assert(object1.property1 === 42);
      assert.throws(() => { object1.property1 = 77 });// throws an error in strict mode
      assert(object1.property1 === 42);
    });

    it('Object.defineProperties()	Adds the named properties described ' +
      'by the given descriptors to an object', () => {
        const object1 = {};

        Object.defineProperties(object1, {
          property1: {
            value: 42,
            writable: true
          },
          property2: {

          }
        });

        assert(object1.property1 === 42);
        assert(object1.property2 === undefined);
      });

    it('Object.getOwnPropertyDescriptor()	Returns a property descriptor for a ' +
      'named property on an object', () => {
        const object1 = {
          property1: 42
        }

        const descriptor1 = Object.getOwnPropertyDescriptor(object1, 'property1');

        assert(descriptor1.configurable === true);
        // expected output: true

        assert(descriptor1.value === 42);
        // expected output: 42
      });

    it('Object.keys()	Returns an array of all enumerable properties on an object', () => {
      // simple array
      var arr = ['a', 'b', 'c'];
      assert.deepEqual(Object.keys(arr), ['0', '1', '2']);

      // array like object
      var obj = { 0: 'a', 1: 'b', 2: 'c' };
      assert.deepEqual(Object.keys(obj), ['0', '1', '2']);

      // array like object with random key ordering
      var anObj = { 100: 'a', 2: 'b', 7: 'c' };
      assert.deepEqual(Object.keys(anObj), ['2', '7', '100']);

      // getFoo is a property which isn't enumerable
      var myObj = Object.create({}, {
        getFoo: {
          value: function () { return this.foo; }
        },
        prop1: {
          value: 1,
          enumerable: true
        }
      });
      myObj.foo = 1;
      assert.deepEqual(Object.keys(myObj), ['prop1', 'foo']);
      //If you want all properties, even non-enumerables, see Object.getOwnPropertyNames().
    });

    it('Object.getOwnPropertyNames()	Returns an array of ' +
      'all enumerable and non-enumerable properties on an object', () => {

        var arr = ['a', 'b', 'c'];
        assert.deepEqual(Object.getOwnPropertyNames(arr).sort(), ["0", "1", "2", "length"]);

        // Array-like object
        var obj = { 0: 'a', 1: 'b', 2: 'c' };
        assert.deepEqual(Object.getOwnPropertyNames(obj).sort(), ["0", "1", "2"]);
        // logs 

        // non-enumerable property
        var my_obj = Object.create({}, {
          getFoo: {
            value: function () { return this.foo; },
            enumerable: false
          }
        });
        my_obj.foo = 1;
        assert.deepEqual(Object.getOwnPropertyNames(my_obj).sort(), ["foo", "getFoo"]);

      });

    it('Object.getOwnPropertyNames() - Items on the prototype chain are not listed:', () => {
      function ParentClass() { }
      ParentClass.prototype.inheritedMethod = function () { };

      function ChildClass() {
        this.prop = 5;
        this.method = function () { };
      }
      ChildClass.prototype = new ParentClass;
      ChildClass.prototype.prototypeMethod = function () { };

      assert.deepEqual(
        Object.getOwnPropertyNames(
          new ChildClass() // 
        )
        , ["prop", "method"]);
    });

    it('Object.preventExtensions()	Prevents any extensions of an object', () => {
      "use strict";
      const object1 = {};

      Object.preventExtensions(object1);

      assert.throws(() => {
        Object.defineProperty(object1, 'property1', {
          value: 42
        });
      });
      assert.throws(() => {
        object1.pippo = 1; //only in  "use strict";
      });
    });

    it('Object.isExtensible()	Determine if extending of an object is allowed', () => {
      const object1 = {};

      assert(Object.isExtensible(object1) === true);
      // expected output: true

      Object.preventExtensions(object1);

      assert(Object.isExtensible(object1) === false);
      // expected output: false

    });

    it('Object.seal()	Prevents other code from deleting properties of an object', () => {
      //"use strict";
      const object1 = {
        property1: 42
      };

      Object.seal(object1);
      object1.property1 = 33;
      assert(object1.property1 === 33);
      // expected output: 33

      delete object1.property1; // cannot delete when sealed
      assert(object1.property1 === 33);
      // expected output: 33
    });

    it('Object.seal()	delete in strict mode throws', () => {
      "use strict";
      const object1 = {
        property1: 42
      };
      Object.seal(object1);
      assert.throws(() => {
        delete object1.property1; // cannot delete when sealed
      });
    });

    it('Object.isSealed()	Determine if an object is sealed', () => {
      const object1 = {
        property1: 42
      };

      assert(Object.isSealed(object1) === false);
      // expected output: false

      Object.seal(object1);

      assert(Object.isSealed(object1) === true);
      // expected output: true
    });

    it('Object.freeze()	Freezes an object: other code cantt delete or change any properties', () => {
      const object1 = {
        property1: 42
      };

      const object2 = Object.freeze(object1);

      object2.property1 = 33;
      // Throws an error in strict mode

      assert(object2.property1 === 42);
      // expected output: 42
    });

    it('Object.isFrozen()	Determine if an object was frozen', () => {
      const object1 = {
        property1: 42
      };

      assert(Object.isFrozen(object1) === false);
      // expected output: false

      Object.freeze(object1);

      assert(Object.isFrozen(object1) === true);
      // expected output: true
    });
  });

  describe('Function bind', () => {
    //The bind() method creates a new function that, when called, has its this keyword
    // set to the provided value,
    // with a given sequence of arguments preceding any provided when the new function is called.
    var module = {
      x: 42,
      getX: function () {
        return this.x;
      },
      sum: function (y, z) {
        return this.x + y + z;
      }
    }

    var retrieveX = module.getX;
    assert(retrieveX() === undefined); // The function gets invoked at the global scope
    var refSum = module.sum;
    assert(isNaN(refSum()) === true); // The function gets invoked at the global scope
    // expected output: undefined

    var boundGetX = retrieveX.bind(module);
    assert(boundGetX() === 42);
    assert(retrieveX.bind(module)() === 42);
    assert(retrieveX.apply(module) === 42);
    assert(retrieveX.call(module) === 42);
    // expected output: 42

    assert(refSum.bind(module, 10, 10)() === 62);
    assert(refSum.apply(module, [10, 10]) === 62);
    assert(refSum.call(module, 10, 10) === 62);
  });
});