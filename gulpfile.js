const gulp = require('gulp');
const fonter = require('gulp-fonter');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

gulp.task('fonts', () => {
    return gulp.src('src/fonts/*.{ttf,otf}')
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('default', gulp.series('fonts'));
