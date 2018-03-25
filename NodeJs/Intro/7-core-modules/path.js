var path = require("path");
// Fixes up .. and .
// logs on Unix: /foo
// logs on Windows: \foo
console.log(path.normalize("/foo/bar/.."));
// Also removes duplicate '//' slashes
// logs on Unix: /foo/bar
// logs on Windows: \foo\bar
console.log(path.normalize("/foo//bar/bas/.."));
// logs on Unix: foo/bar/bas
// logs on Windows: foo\bar\bas
console.log(path.join("foo", "/bar", "bas"));

var completePath = "/foo/bar/bas.html";
// Logs : /foo/bar
console.log(path.dirname(completePath));
// Logs : bas.html
console.log(path.basename(completePath));
// Logs : .html
console.log(path.extname(completePath));
