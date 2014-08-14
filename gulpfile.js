var gulp = require('gulp');
var packageJson = require('./package.json');
var loadTasks = require('module-boilerplate');
var exec = require('child_process').exec;

loadTasks(gulp, packageJson);

gulp.task('coverage', function() {
  exec('mocha -r blanket -R html-cov > coverage.html tests/tests.js');
});
