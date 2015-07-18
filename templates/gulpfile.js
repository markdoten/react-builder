var argv = require('yargs').argv;
var browserify = require('browserify');
var forEach = require('mout/array/forEach');
var fs = require('fs');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var open = require('openurl').open;
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var util = require('gulp-util');

var path = {
  MINIFIED_OUT: 'nice.min.js',
  OUT: 'nice.js',
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist',
  ENTRY_POINT: './nice.js',
  PAGES: './src/js/client/components/pages'
};

function build(isProd) {
  var b = browserify({
    transform: ['reactify'],
    extensions: ['.jsx']
  });
  b.add(path.ENTRY_POINT);

  forEach(fs.readdirSync(path.PAGES), function(file) {
    b.require(fs.createReadStream([path.PAGES, file].join('/')), {
      basedir: path.PAGES,
      expose: ['./pages/', file].join('')
    });
  });

  b = b.bundle();
  isProd || (b = b.pipe(source(path.MINIFIED_OUT)));
  isProd && (b = b.pipe(streamify(uglify(path.MINIFIED_OUT))));
  return b.pipe(gulp.dest(isProd ? path.DEST_BUILD : path.DEST_SRC));
}

/**
 * Build, minify, and move the files to the dist folder.
 */
gulp.task('build', function() {
  return build(true);
});

/**
 * Build the project without uglifying and put it in a dev folder.
 */
gulp.task('build-dev', function() {
  return build();
});

/**
 * Start the coverage server on a different port and open the coverage URL.
 */
gulp.task('coverage', ['test-server'], function() {
  nodemon({
    script: 'server/render.js',
    args: ['3002'],
    watch: ['test/**/*.js'],
    tasks: ['test-server']
  }).on('config:update', function() {
    setTimeout(function() {
      open('http://localhost:3002/coverage');
    }, 1000);
  })
});

/**
 * Convert LESS files within the app to CSS and minifies them.
 */
gulp.task('lessify', function() {
  gulp.src('src/less/*.less')
    .pipe(less().on('error', util.log))
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

/**
 * The default task to build the main Flux/React application and associated CSS.
 */
gulp.task('default', ['build-dev', 'lessify']);

/**
 * Runs the app server.
 * Builds the front end application, starts the server, and watches for changes
 * so that it can rebuild as needed. This works for JS as well as CSS.
 */
gulp.task('server', function() {
  gulp.start('default');

  gulp.watch(['src/js/client/**/*.js', 'src/js/client/**/*.jsx', 'src/js/shared/**/*.js'], ['build-dev']);
  gulp.watch('src/**/*.less', ['lessify']);

  nodemon({ script: 'server/index.js', watch: ['src/js/server'], args: ['3001'] })
    .on('restart', function () {
      console.log('restarted!')
    });
});

/**
 * Unit tests for the Express app.
 * This uses mocha for the unit tests and istanbul for code coverage.
 */
gulp.task('test-server', function(cb) {
  gulp.src(['src/js/server/**/*.js', 'server/*.js', '!src/js/server/routes.js', '!src/js/server/test/**/*.js'])
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/spec/server/**/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports({
          dir: './coverage/api',
          reporters: ['lcov']
        }))
        .on('end', cb);
    });
});
