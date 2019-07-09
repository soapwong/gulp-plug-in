const gulp = require('gulp')
const json = require('./gulp-json')

gulp.task('default', () => {
    let s = gulp.src('.src/dududu.json')
        .pipe(json())
        .pipe(gulp.dest('./build'))
    return s
})