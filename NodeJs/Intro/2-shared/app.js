var foo = require("./foo");
console.log("initial something", foo.something);

foo.something = 456;

var bar = require("./bar");
