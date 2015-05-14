module.exports = function(config){
  var root = 'src/web';
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections
    basePath : '../',

    // files to include, ordered by dependencies
    files : [
        // include relevant Angular files and libs
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/angular-[a-z]*/angular-[a-z]*.min.js',
        'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      
        // include JS files
        'src/web/**/*.js',
    
        // include html template files
        // 'app/partials/directives/*.html',
        // 'app/partials/*.html',

        // add utils
        'test/utils/**/*.js',
    
        //add fixtures
        { pattern: 'test/fixtures/**/*.json', watched: true, served: true, included: false},
        // include unit test specs
        'test/unit/**/*.js'
    ], 
    // files to exclude
    exclude : [
        'src/web/lib/**/*'
    ],

    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,

    // testing framework, be sure to install the correct karma plugin
    frameworks: ['jasmine'],

    // browsers to test against, be sure to install the correct browser launcher plugins
    browsers : ['PhantomJS'],

    // map of preprocessors that is used mostly for plugins
    preprocessors: {
      // 'app/partials/directives/*.html': 'html2js',
      // 'app/partials/*.html': 'html2js'
      
      // test coverage
      'test/utils/**/*.js': ['jshint', 'coverage'],
      'src/web/app.js': ['jshint', 'coverage']
    },

    specReporter: {masLogLines: 5},

    reporters: ['spec', 'coverage'],

    // list of karma plugins
    plugins : [
      'karma-jshint-preprocessor',
      'karma-coverage',
      'karma-spec-reporter',
//      'karma-chrome-launcher',
//      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher'
    ],

    // plugin settings
    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/web/'
    },
    coverageReporter: {
      // type of file to output, use text to output to console
      type : 'text',
      // directory where coverage results are saved
      dir: 'test-results/coverage/' 
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt' 
    },
    junitReporter: {
      outputFile: 'test-results/junit-results.xml'
    }
})}

