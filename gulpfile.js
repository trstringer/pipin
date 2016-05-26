var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('test', function () {
  exec('node index.js --list', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});