console.log(process.argv);
process.nextTick(function() {
  console.log("next tick");
});
console.log("immediate");
