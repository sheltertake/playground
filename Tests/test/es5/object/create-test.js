// var assert = require('assert');
var assert = require("chai").assert;

describe("Es5 - JavaScript 1.8.5 - Firefox 4 IE9 - 2011", function() {
  describe("object static methods", () => {
    it("Object.create()	Creates a new object with the specified prototype object and properties", () => {
      function Shape(x, y) {
        this.x = x;
        this.y = y;
      }
      Shape.prototype.Area = function() {
        return this.x + this.y;
      };
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
  });
});
