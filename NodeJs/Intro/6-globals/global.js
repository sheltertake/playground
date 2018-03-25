console.log(console === global.console); // true
console.log(setTimeout === global.setTimeout); // true
console.log(process === global.process); // true
// Add something to global
global.something = 123;
console.log(something); // 123
