const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Завдання для компіляції основного SCSS файлу у CSS
gulp.task('sass', function() {
  return gulp.src('scss/styles.scss') // Основний файл SCSS
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css')); // Вихідний шлях для згенерованих CSS файлів
});

// Завдання для відстеження змін у всіх SCSS файлах
gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', gulp.series('sass')); // Відстеження змін у всіх SCSS файлах
});

// Завдання за замовчуванням
gulp.task('default', gulp.series('sass', 'watch'));
