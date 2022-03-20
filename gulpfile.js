const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const browserSync = require("browser-sync").create();
const commonjs = require("rollup-plugin-commonjs");

gulp.task("build:pug", () => {
  return gulp.src("src/*.pug").pipe(pug()).pipe(gulp.dest("build"));
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
          exclude: "node_modules/**/*",
        }),
      ],
    })
    .then((bundle) => {
      return bundle.write({
        file: "build/js/app.js",
        format: "iife",
      });
    });
});

gulp.task("build:images", () => {
  return gulp
    .src("src/img/**/*", {
      dot: true,
      allowEmpty: true,
    })
    .pipe(gulp.dest("build/img"));
});

gulp.task("build:cname", () => {
  return gulp.src("CNAME").pipe(gulp.dest("build"));
});

gulp.task(
  "build",
  gulp.parallel(
    "build:pug",
    "build:scss",
    "build:js",
    "build:images",
    "build:cname"
  )
);

gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "build",
    },
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
