var foo = require("./foo");

var obj = new foo();
console.log("initial something", obj.something);
obj.something = 456;
console.log("Something changed", obj.something);

var bar = require("./bar");
