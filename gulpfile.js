var gulp = require('gulp'),
    webpack = require('gulp-webpack'),
    del = require('del');

var distDir = 'dist';

// Clean
gulp.task('clean', function() {
    del.sync([distDir]);
});

gulp.task('build', function() {
    return gulp.src('main.js')
        .pipe(webpack({
            module: {
                loaders: [
                    {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
                ]
            },
            devtool: 'source-map',
            output: {
                filename: '[name].bundle.js',
                sourceMapFilename: '[name].bundle.map'
            }
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('watch', ['build'], function() {
    gulp.watch(['./index.js', './main.js', './lib/**/*.js'], ['build']);
});

gulp.task('default', ['build']);
