var gulp       =  require('gulp');
var gutil      =  require('gulp-util');
var path       =  require('path');
var gulpSass   =  require('gulp-sass');
//var sequence =  require('run-sequence');
//var del      =  require('del');
var devServer  =  require('./devServer.js');

gulp.task('dev-server', function(){
  devServer();
})

gulp.task('compile-scss', function(){
  return gulp.src("./src/client/assets/scss/style.scss")
    .pipe(gulpSass().on("error",gulpSass.logError))
    .pipe(gulp.dest('./public'))
})

gulp.task('watch', function(){
  var watchPaths = [
    path.join(__dirname,'public/**/*.js'),
    path.join(__dirname,'src/**/*.scss'),
    path.join(__dirname,'public/**/*.html')
  ];
  gulp.watch(watchPaths, ['compile-scss']);
});


// Default task. Type 'gulp' in terminal to get build system going.
gulp.task('default', ['dev-server','compile-scss','watch'], function(){
  gutil.log('watching...');
});
