# Gulp-I18N-Lint2 
[![NPM version][npm-image]][npm-url] 

A simple lint job for I18N files extracted by gulp-i18n-extract.

## Installation

Install `gulp-i18n-lint2` using npm into your local repository.

```bash
npm install gulp-i18n-lint2 --save-dev
```

## Usage

Setup a gulp task for `i18n-lint`.

```js
const gulp = require('gulp');
const validator = require('gulp-i18n-lint2');

gulp.task('i18n-lint', function() {
  return gulp.src('./locale/i18n.json')
        .pipe(validator("<Your Module Name>"));
});
```

## License

[Apache 2.0](/license)

[npm-url]: https://npmjs.org/package/gulp-i18n-lint2
[npm-image]: http://img.shields.io/npm/v/gulp-i18n-lint2.svg