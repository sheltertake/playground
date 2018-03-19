// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it(
      "Object.getOwnPropertyNames()	Returns an array of " +
        "all enumerable and non-enumerable properties on an object",
      () => {
        var arr = ["a", "b", "c"];
        assert.deepEqual(Object.getOwnPropertyNames(arr).sort(), [
          "0",
          "1",
          "2",
          "length"
        ]);

        // Array-like object
        var obj = { 0: "a", 1: "b", 2: "c" };
        assert.deepEqual(Object.getOwnPropertyNames(obj).sort(), [
          "0",
          "1",
          "2"
        ]);
        // logs

        // non-enumerable property
        var my_obj = Object.create(
          {},
          {
            getFoo: {
              value: function() {
                return this.foo;
              },
              enumerable: false
            }
          }
        );
        my_obj.foo = 1;
        assert.deepEqual(Object.getOwnPropertyNames(my_obj).sort(), [
          "foo",
          "getFoo"
        ]);
      }
    );

    it("Object.getOwnPropertyNames() - Items on the prototype chain are not listed:", () => {
      function ParentClass() {}
      ParentClass.prototype.inheritedMethod = function() {};

      function ChildClass() {
        this.prop = 5;
        this.method = function() {};
      }
      ChildClass.prototype = new ParentClass();
      ChildClass.prototype.prototypeMethod = function() {};

      assert.deepEqual(
        Object.getOwnPropertyNames(
          new ChildClass() //
        ),
        ["prop", "method"]
      );
    });
  });
});
