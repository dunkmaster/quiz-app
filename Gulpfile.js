var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  sass = require("gulp-sass"),
  nodemon = require("gulp-nodemon"),
  neat = require("node-neat").includePaths;

var paths = {
  scss: './scss/*.scss'
};


gulp.task("sass", function(){
    gulp.src(paths.scss)
      .pipe(sass({
        includePaths: ['sass'].concat(neat)
      }))
      .pipe(gulp.dest('./public/css'));
});



gulp.task('scripts', function(){

  gulp.src(['app.js'])
    .pipe(browserify({
      debug: true,
      transform: ['reactify']
    }))
    .pipe(gulp.dest('./public/'));
});


gulp.task('watch', function () {
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch(['./models/*.js', './*.js','./components/*.js'], ['scripts']);
});

gulp.task('develop', function(){
  nodemon({ script: 'server.js', ext: 'html js', ignore: ['ignored.js'] })
    .on('start', ['watch'])
    .on('restart', function(){
      console.log('restarted');
    });
});

gulp.task('default', ['scripts']);
