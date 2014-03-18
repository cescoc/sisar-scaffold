/*
 * grunt-init-sisar
 *
 * Do whatever you want, but do it the right way.
 */

'use strict';

// Basic template description.
exports.description = 'Creates a scaffhold for a typical project of mines';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Qualche nota bla bla bla';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    {
      name: 'author',
      message: 'Hi! Whats your name?'
    },{
      name: 'name',
      message: 'Please, give a name to this project.',
      default: 'my-project'
    },
    {
      name: 'title',
      message: 'Specify a more human readable and epic title',
      default: 'Another awesome website'
    },
    {
      name: 'description',
      message: 'What about a short description? Feel free to write down your thoughts, your fears, your desires...',
    },
    {
      name: 'version',
      message: 'Version number? (only numbers and dots)',
      validator: /^\d+(\.\d+)+$/,
      default: '0.0.1'
    },
    {
      name: 'css_folder',
      message: 'Specify a name for th Stylesheet folder (default: \'css\')',
      default: 'css'
    },
    {
      name: 'js_folder',
      message: 'Specify a name for th Javascript folder (default: \'js\')',
      default: 'js'
    },
    {
      name: 'jqueryVersion',
      message: 'Wich version of jQuery shall we use? (only numbers and dots).\nPlease note that jQuery 2.0+ only support IE9+. By default we use 1.9.0 but you can specify an earlier version and forget about dumb browsers.',
      validator: /^\d+(\.\d+)+$/,
      default: '1.9.0'
    },
    {
      name: 'googlefonts',
      message: 'Any particular Google Web Font to use?.\nSpecify fonts name separated by pipes and replace whitespaces with pluses. Eg. Lato|Droid+Sans',
      default: '1'
    }
  ], function(err, props) {
    
    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: props.name,
      version: props.version,
      title: props.title,
      author: props.author,
      description: props.description,
      jqueryVersion: props.jqueryVersion,
      googlefonts: props.googlefonts,
      npm_test: 'grunt',
      node_version: '>= 0.8.0',
      devDependencies: {
        'grunt-contrib-jshint': 'latest',
        'grunt-contrib-uglify': 'latest',
        'grunt-contrib-concat': 'latest',
        'grunt-contrib-watch': 'latest',
        'grunt-contrib-sass': 'latest',
        'grunt-contrib-imagemin': 'latest',
        'grunt-svgmin': 'latest',
        'grunt-svg2png': 'latest',
        'grunt-contrib-compass': 'latest',
        'grunt-notify': 'latest'
      },
    });

    // Generate jquery.json file.
    init.writePackageJSON(props.jqueryjson, props);

    // All done!
    done();
  });

};
