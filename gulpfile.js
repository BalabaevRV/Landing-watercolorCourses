const { src, dest, parallel, series, watch } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");

const styles = () => {
    return src ("dev/sass/*.sass")
        .pipe(plumber())
        .pipe(sourcemaps.init("."))
        .pipe(sass().on('error', sass.logError))
        .pipe (postcss([autoprefixer]))
        // .pipe(csso())
        // .pipe(rename("style.min.css"))
        .pipe(sourcemaps.write("."))
        .pipe(dest("dev/css/"))
}

const server = () => {
    browserSync.init({
        server: { baseDir: 'dev/'},
        notify: false,
        online: true,
        ui: false
    })
}

const watcher = () => {
    watch("dev/sass/*.sass", series("styles"));
    watch("dev/*.html").on("change", browserSync.reload);
    watch("dev/css/*.css").on("change", browserSync.reload);
}

exports.server = server;
exports.styles = styles;
exports.start = parallel (styles, server, watcher);