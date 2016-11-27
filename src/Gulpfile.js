// Include dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');
var concat = require('gulp-concat');

// Javascript compile and babel
gulp.task('js', () => {
  // return gulp.src([
  //   './node_modules/lory.js/dist/lory.js',
  //   './src-js/home.js'
  // ])
  //   // .pipe(babel({
  //   //     presets: [
  //   // 		'es2015'
  //   // 	]
  //   // }))
  //   .pipe(concat('home.js'))
  //   .pipe(sourcemaps.write('.'))
  //   .pipe(gulp.dest('../js'));

  return gulp.src([
		'./node_modules/svg4everybody/dist/svg4everybody.js',
		'./src-js/offCanvas.js',
		'./src-js/page.js',
    './src-js/home.js'
	])
        // .pipe(babel({
        //     presets: [
		// 		'es2015'
		// 	]
        // }))
		.pipe(concat('page.js'))
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('../js'));
});

// SVG Icons
gulp.task('sprite', function () {
    gulp.src('./icons/*.svg')
        .pipe(svgstore())
        .pipe(gulp.dest('../img/'))
});

// SASS task
gulp.task('sass', function () {
	gulp.src(['./sass/*.scss', './sass/**/*.scss'])
	    .pipe(sourcemaps.init())
	    .pipe(sass({
			includePaths: [
				'./node_modules/foundation-sites/scss'
			]
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			// Change autoprefixer settings here
			browsers: [
				'last 2 versions',
				'ie >= 9',
				'Android >= 2.3'
			],
			cascade: false
		}))
	    .pipe(sourcemaps.write('./maps/'))
		.pipe(gulp.dest('../css/'))
		.pipe(browserSync.stream({once: true}))
});

// Browser Sync
gulp.task('serve', ['sass'], function() {
 	gulp.watch(['./sass/*.scss', './sass/**/*.scss'], ['sass']).on('change', browserSync.reload);
    gulp.watch(['../*.html']).on('change', browserSync.reload);

    browserSync.init({
		server: {
		    baseDir: "../"
		}
        // proxy: "sitename.local"
    });
});

// Watch task
gulp.task('watch', function() {
	gulp.watch(['./sass/*.scss', './sass/**/*.scss'], ['sass']);  // If a file changes, re-run 'sass'
});
