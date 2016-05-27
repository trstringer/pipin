var gulp = require('gulp');
var exec = require('child_process').exec;

function dumpOutput(err, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
}

gulp.task('test', function () {
  exec('node index.js -m rpi2', dumpOutput);
});

gulp.task('test list', function () {
  exec('node index.js -l', dumpOutput);
});