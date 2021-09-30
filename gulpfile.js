const {src, dest, parallel, series, watch} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const imagemin = require("gulp-imagemin");

const copyCSS = () => {
    return src ("dev/css/*.css")
        .pipe(dest("prod/css/"))
}

const copyJS = () => {
    return src ("dev/scripts/*.js")
        .pipe(dest("prod/script/"))
}

const copyHTML = () => {
    return src ("dev/*.html")
        .pipe(dest("prod/"))
}

const copyFavicon = () => {
    return src ("dev/favicon.ico")
        .pipe(dest("prod/"))
}


const styles = () => {
    return src (["dev/sass/fonts.sass", "dev/sass/reset.sass", "dev/sass/layout.sass","dev/sass/blocks.sass"])
        .pipe(plumber())
        .pipe(sourcemaps.init("."))
        .pipe(sass().on('error', sass.logError))
        .pipe (postcss([autoprefixer]))
        .pipe(csso())
        .pipe(concat("bundle.min.css"))
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
    watch("dev/scripts/*.js").on("change", browserSync.reload);
    watch("dev/css/*.css").on("change", browserSync.reload);
}

const clean = () => {
    return del("prod");
};

const images = () => {
    return src("dev/img/*.{jpg,png,svg}")
        .pipe(dest("prod/img/"))
        .pipe(imagemin([
            imagemin.optipng({optimizationLevel: 3}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.svgo()
        ]))
        .pipe(dest("prod/img/"))
}

exports.server = server;
exports.styles = styles;
exports.images = images;
exports.prod = series(clean, styles, copyCSS, copyJS, copyHTML, copyFavicon, images);
exports.start = parallel (styles, server, watcher);