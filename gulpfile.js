
// Require all dependencies
var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	nano = require('gulp-cssnano'),
	prefix = require('gulp-autoprefixer'),
	webpack = require('webpack-stream'),
	sequence = require('run-sequence'),
	del = require('del');



// Move HTML to dist/
gulp.task('html', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

// Compile sass and send to dist/
gulp.task('sass', function () {
	return gulp.src('src/styles/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix({
			browsers: ['> 1%', 'IE 8'], 
			cascade: false
		}))
		.pipe(nano())
		.pipe(gulp.dest('dist/styles/'))
		.pipe(browserSync.stream());
});

// Bundle JS with webpack
gulp.task('webpack', function() {
	return gulp.src('src/entry.js')
		.pipe(webpack({
			entry: ['./src/entry.js'],
			output: {
				filename: 'bundle.js'
			},
			devtool: 'source-map',
			module: {
				loaders: [
					{
						test: /\.js$/,
						loaders: ['babel-loader?presets[]=es2015'],
						exclude: /node_modules/
					}
				]
			}
		})).on('error', function() {
			this.emit('end');
		})
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(browserSync.stream());
});

// Move static assets to dist/
gulp.task('static', function() {
	gulp.src('src/assets/**/*')
		.pipe(gulp.dest('dist/assets'));
});

// Remove all files from dist/
gulp.task('clean', function() {
	return del(['dist/**/*']);
});



// Build task
gulp.task('prod', function() {
	sequence('clean', ['html', 'sass', 'webpack', 'static'])
});

// Development task
gulp.task('dev', ['prod'], function() {
	
	gulp.watch('src/*.html', 			['html']);
	gulp.watch('src/styles/**/*.scss',  ['sass']);
	gulp.watch('src/**/*.js', 			['webpack']);
	
	browserSync.init({
		server: './dist',
		notify: false,
		logLevel: 'silent'
	});
	
});



// Default task

gulp.task('default', ['dev']);