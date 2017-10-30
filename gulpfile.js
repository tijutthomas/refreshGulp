var gulp = require('gulp'),
	gutil = require('gulp-util'),
	jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rimraf = require('rimraf');
	
gulp.task('default',['watch']);

gulp.task('jshint', function(){
	
	return gulp.src('source/javascript/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
	
});
	
gulp.task('build-css', function(){
	return gulp.src('source/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/assets/stylesheets'));
});

gulp.task('build-js', function(){
	return gulp.src('source/javascript/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		//.pipe(gutil.env.type === 'production'? uglify() : gutil.noop())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/assets/javascript'));
});

gulp.task('clean', function(cb){
	rimraf('public/assets/javascript/build.js', cb);
})

gulp.task('watch', function(){
	gulp.watch('source/javascript/**/*.js', ['jshint','build-js','clean']);
	gulp.watch('source/scss/**/*.scss', ['build-css']);
});
