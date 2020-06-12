const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");


gulp.task("default", ["styles"], function() {
  gulp.watch("sass/**/*.scss", ["styles"]);
  browserSync.init({
    server: "./"
  });
});

gulp.task("scripts", function() {
  gulp.src("js/**/*.js")
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dist/js"));
});
gulp.task("scripts-dist", function() {
  gulp.src("js/**/*.js")
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(uglify())
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

gulp.task('images', function() {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});
