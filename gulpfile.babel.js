import gulp from 'gulp';
import deploy from 'gulp-gh-pages-will'
import GulpLoadPlugins from 'gulp-load-plugins';
import VinylBuffer from 'vinyl-buffer';
import PrettyHRTime from 'pretty-hrtime';
import BrowserSync from 'browser-sync';
import Del from 'del';
import RunSequence from 'run-sequence';

const $ = GulpLoadPlugins();

// Common config
const config = {
  dir: {
    root:   './',
    dist:   './dist/',
    assets: './src/assets/',
    js:     './src/js/',
    styles: './src/styles/'
  },
  isWatchify: false,
  isRelease:  false
};

////////////////////////////////////////////////////////////////////////////////
// Transpiler
////////////////////////////////////////////////////////////////////////////////

// JavaScript ( ES6, React JSX )
gulp.task( 'js', $.watchify( ( watchify ) => {
  const time = process.hrtime();

  return gulp.src( [ config.dir.js + 'App.js' ] )
    .pipe( $.plumber() )
    .pipe( watchify( {
      watch: config.isWatchify,
      basedir:   './',
      debug:     true,
      transform: [ 'babelify' ]
    } ) )
    .pipe( VinylBuffer() )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.init( { loadMaps: true } ) ) )
    .pipe( $.if( config.isRelease, $.uglify() ) )
    .pipe( $.rename( 'bundle.js' ) )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.write( './' ) ) )
    .pipe( $.if( config.isRelease, gulp.dest( config.dir.dist ), gulp.dest( config.dir.assets ) ) )
    .on( 'end', () => {
      const taskTime = PrettyHRTime( process.hrtime( time ) );
      $.util.log( 'Bundled', $.util.colors.green( 'bundle.js' ), 'in', $.util.colors.magenta( taskTime ) );
    } );
} ) );

// CSS ( Stylus )
gulp.task( 'css', () => {
  return gulp.src( [ config.dir.styles + 'App.scss' ], { base: config.dir.root } )
    .pipe( $.plumber() )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.init() ) )
    .pipe( $.sass( { outputStyle: 'expanded'} ) )
    .pipe( $.pleeease({
      fallbacks: { autoprefixer: ['last 4 versions'] },
      optimizers: { minifier: true }
    }))
    .pipe( $.rename( 'bundle.css' ) )
    .pipe( $.if( config.isRelease, $.cleanCss() ) )
    .pipe( $.if( !( config.isRelease ), $.sourcemaps.write( './' ) ) )
    .pipe( $.if( config.isRelease, gulp.dest( config.dir.dist ), gulp.dest( config.dir.assets ) ) );
} );

////////////////////////////////////////////////////////////////////////////////
// Watch
////////////////////////////////////////////////////////////////////////////////

// Enable wachify
gulp.task( 'watch:js', ( done ) => {
  config.isWatchify = true;
  done();
} );

// Local web server
gulp.task( 'server', () => {
  const browser = BrowserSync.create();
  browser.init( {

    server: config.dir.root,
    startPath: config.dir.assets
  } );
} );

// Watch files
gulp.task( 'watch', [ 'watch:js', 'js', 'css', 'server' ], () => {
  gulp.watch( [ config.dir.styles + '**/*.scss' ], [ 'css' ] );
} );

// Default task
gulp.task( 'default', [ 'watch' ] );

////////////////////////////////////////////////////////////////////////////////
// Release
////////////////////////////////////////////////////////////////////////////////

// Clean release image
gulp.task( 'release:clean', () => {
  return Del.sync( config.dir.dist );
} );

// Create release directory & copy files
gulp.task( 'release:copy', () => {
  const src = [
    config.dir.assets + '*.html',
    config.dir.assets + 'fonts/**',
    config.dir.assets + 'images/**',
    config.dir.assets + 'vendor/**'
  ];

  return gulp.src( src, { base: config.dir.assets } )
    .pipe( gulp.dest( config.dir.dist ) );
} );

// Release config
gulp.task( 'release:config', ( done ) => {
  config.isRelease = true;
  done();
} );

// Build release image
gulp.task( 'release', ( done ) => {
  return RunSequence(
    'release:clean',
    'release:copy',
    'release:config',
    [ 'js', 'css' ],
    done
  );
} );

// Build and push to github pages
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy({
      remoteUrl: "https://github.com/pcd-tokyo/pcd-tokyo.github.io.git",
      branch: "gh-pages"
    }))
});
