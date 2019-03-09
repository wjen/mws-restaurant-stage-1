const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");


gulp.task("default", ["styles"], function() {
  gulp.watch("sass/**/*.scss", ["styles"]);
  browserSync.init({
    server: "./"
  });
});

gulp.task("scripts", function() {
  gulp.src("js/**/*.js")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist/js"));
});
gulp.task("scripts-dist", function() {
  gulp.src("js/**/*.js")
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist/js"));
});

gulp.task("styles", function() {
  gulp
    .src("sass/**/*.scss")
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());

});

