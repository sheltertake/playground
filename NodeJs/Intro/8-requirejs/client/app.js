define(["./foo", "./bar"], function(foo, bar) {
  foo();
  bar.log();
  if (true) {
    require(["./bas"], function(bas) {
      // continue code here.
      bas.log();
    });
  }
});
