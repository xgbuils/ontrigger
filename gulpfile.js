var gulp  = require('gulp')
var mocha = require('gulp-mocha')

gulp.task('test', function () {
  gulp.src('./test/ontrigger_test.js')
    .pipe(mocha())
})