let gulp = require("gulp");
let pug = require("gulp-pug");
let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let rollup = require("rollup");
let resolve = require("rollup-plugin-node-resolve");
let babel = require("rollup-plugin-babel");
let browserSync = require("browser-sync").create();
let commonjs = require("rollup-plugin-commonjs");

gulp.task("build:pug", () => {
  return gulp
    .src("src/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("build"));
});

gulp.task("build:scss", () => {
  return gulp
    .src("src/sass/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest("build/css"));
});

gulp.task("build:js", () => {
  return rollup
    .rollup({
      input: "src/js/app.js",
      plugins: [
        resolve(),
        commonjs(),
        babel({
          // exclude: [/node_modules\/(?!(swiper|dom7)\/).*/]
          exclude: "node_modules/**/*"
        })
      ]
    })
    .then(bundle => {
      return bundle.write({
        file: "build/js/app.js",
        format: "iife"
      });
    });
});

gulp.task("build:images", () => {
  return gulp
    .src("src/img/**/*", {
      dot: true,
      allowEmpty: true
    })
    .pipe(gulp.dest("build/img"));
});

gulp.task(
  "build",
  gulp.parallel("build:pug", "build:scss", "build:js", "build:images")
);

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "build"
    }
  });
});

gulp.task("watch", () => {
  gulp.watch("src/**/*.pug", gulp.series("build:pug"));
  gulp.watch("src/sass/**/*.sass", gulp.series("build:scss"));
  gulp.watch("src/js/**/*.js", gulp.series("build:js"));
  gulp.watch("src/img/**/*", gulp.series("build:images"));
  gulp.watch("build/**/*").on("change", browserSync.reload);
});

gulp.task("default", gulp.series("build", gulp.parallel("serve", "watch")));
