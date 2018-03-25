var fs = require("fs");
// write
fs.writeFileSync("test.txt", "Hello fs!");
// read
console.log(fs.readFileSync("test.txt").toString());

if (process.argv[2]) {
  console.log("sync log pre delete");
  try {
    fs.unlinkSync("./test.txt");
    console.log("test.txt successfully deleted sync");
  } catch (err) {
    console.log("Error:", err);
  }
  console.log("sync log post delete");
} else {
  console.log("async log pre delete");
  fs.unlink("./test.txt", function(err) {
    if (err) {
      console.log("Error:", err);
    } else {
      console.log("test.txt successfully deleted async");
    }
  });
  console.log("async log post delete");
}
