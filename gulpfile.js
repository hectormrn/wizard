var gulp = require('gulp');

var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat     = require('gulp-concat');
var wrap       = require('gulp-wrap');
var declare    = require('gulp-declare');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');

gulp.task('default', [
	'sass',
	'sass:watch'
]);

gulp.task('sass', function() {
	return gulp.src('./source/scss/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css/'));
});

gulp.task('sass:watch', function() {
	gulp.watch('source/scss/*.scss', ['sass']);
});

