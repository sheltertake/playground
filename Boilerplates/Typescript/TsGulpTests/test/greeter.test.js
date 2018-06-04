"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var greeter_1 = require("../source/entities/greeter");
describe("Greeter Class", function () {
    it("Should set msg when an instance is created", function () {
        var expected = "world!";
        var greater = new greeter_1.default(expected);
        chai_1.expect(greater.greeting).eql(expected);
    });
    it("Should greet", function () {
        var greet = "world!";
        var greater = new greeter_1.default(greet);
        var actual = greater.greet();
        var expected = "Hello, " + greet;
        chai_1.expect(actual).eql(expected);
    });
    it("Should get something", function () {
        var greater = new greeter_1.default("test");
        var actual = greater.getSomething();
        chai_1.expect(actual).eql("test");
    });
});
