var assert = require("chai").assert;

describe("ES6 / ES2015 - Modern browsers + EDGE [96%] - 2015", () => {
  describe("Functions", () => {
    describe("Arrow Functions", () => {
      /*
            An arrow function expression has a shorter syntax than a function expression and 
            does not have its own this, arguments, super, or new.target. 
            These function expressions are best suited for non-method functions, 
            and they cannot be used as constructors.

            Syntax
            (param1, param2, …, paramN) => { statements } 
            (param1, param2, …, paramN) => expression
            // equivalent to: => { return expression; } 

            // Parentheses are optional when there's only one parameter name:
            (singleParam) => { statements }
            singleParam => { statements }

            // The parameter list for a function with no parameters should be written with a 
            // pair of parentheses.
            () => { statements }
            
            Advanced Syntax
            // Parenthesize the body of function to return an object literal expression:
            params => ({foo: bar}) 

            // Rest parameters and default parameters are supported
            (param1, param2, ...rest) => { statements } 
            (param1 = defaultValue1, param2, …, paramN = defaultValueN) => { 
            statements } 

            // Destructuring within the parameter list is also supported
            var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c; f(); // 6
            */

      it("Shorter functions", () => {
        var materials = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

        assert.deepEqual(
          materials.map(function(material) {
            return material.length;
          }),
          [8, 6, 7, 9]
        );

        assert.deepEqual(
          materials.map(material => {
            return material.length;
          }),
          [8, 6, 7, 9]
        );
      });

      it("0 parameters", () => {
        const arr = () => 5;
        assert(arr() === 5);
      });
      it("1 parameter, no brackets", () => {
        const arr = x => x + "foo";
        assert(arr("fee fie foe ") === "fee fie foe foo");
      });
      it("multiple parameters - parentesis mandatory", () => {
        var c = (v, w, x, y, z) => "" + v + w + x + y + z;
        assert(c(6, 5, 4, 3, 2) === "65432");
      });

      it('lexical "this" binding', () => {
        var d = {
          x: "bar",
          y: function() {
            return z => this.x + z;
          }
        }.y();
        var e = { x: "baz", y: d };
        assert(d("ley") === "barley" && e.y("ley") === "barley");
      });

      it("no line break between params and =>", () => {
        assert.throws(() => {
          Function("x\n => 2")();
        });
      });

      it('no "prototype" property', () => {
        var a = () => 5;
        assert(a.hasOwnProperty("prototype") === false);
      });

      it("Not Just Shorter Syntax", () => {
        var controller = {
          foo: 1,
          getFooFunction: function() {
            return this.foo;
          },

          getFooArrow: () => {
            return this.foo;
          },
          getArgsFunction: function() {
            return Array.prototype.slice.call(arguments);
          },
          getArgsArrow: () => {
            return Array.prototype.slice.call(arguments);
          }
        };
        assert(controller.getFooFunction() === controller.foo);
        assert(controller.getFooArrow() !== controller.foo);

        var obj = Object.create(controller);

        assert(obj.getFooFunction() === obj.foo);
        assert(obj.getFooArrow() !== obj.foo);

        assert.deepEqual(controller.getArgsFunction(1, 2, 3), [1, 2, 3]);
        assert.notDeepEqual(controller.getArgsArrow(1, 2, 3), [1, 2, 3]);
      });
    });
  });

  describe("Promises", () => {});
  describe("Modules", () => {});
});
