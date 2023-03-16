const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

const sync = require('browser-sync').create();

function js() {
	return src('src/**.js').pipe(dest('dist'));
}

function html() {
	return src('src/**.html')
		.pipe(include())
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(dest('dist'));
}

function scss() {
	return src('src/scss/**.scss').pipe(sass()).pipe(csso()).pipe(dest('dist'));
}

function serve() {
	sync.init({
		server: './dist',
	});

	watch('src/**.js', series(js)).on('change', sync.reload);
	watch('src/**.html', series(html)).on('change', sync.reload);
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload);
}

exports.build = series(scss, js, html);
exports.serve = series(scss, js, html, serve);
