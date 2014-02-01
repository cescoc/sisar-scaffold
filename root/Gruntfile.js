module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! {%= title || name %} - v <%= version %}' +
      'Created on {%= grunt.template.today("yyyy-mm-dd") %} by <%= author %}\n\n' +
      '{%= description %}\n\n',
    // Task configuration.
    concat: {
            script: {
                options: {
                    separator:'\n\n'
                },
                src: [
                    'js/lib/modernizr.js',
                    'js/lib/!(modernizr).js',
                    'js/src/!(script).js',
                    'js/src/script.js'
                ],
                dest: 'js/script.js',
            },
            css: {
                src: [
                    'css/parts/main.css',
                    'css/parts/!(main).css'
                ],
                dest: 'css/style.css'
            }
        },

        uglify: {
            build: {
                src: 'js/script.js',
                dest: 'js/script.min.js'
            }
        },

        

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },


        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false,
                    removeUselessStrokeAndFill: true,
                    removeEmptyAttrs: true
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/src',
                    src: '**/*.svg',
                    dest: 'img/',
                    ext: '.svg'
                }]
            }
        },

        svg2png: {
            all: {
                files: [{
                    src: ['img/*.svg']
                }]
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'nested'
                },
                files: {
                    'css/bootstrap.css': 'scss/bootstrap/bootstrap.scss',
                    'css/font-awesome.css': 'scss/font-awesome/font-awesome.scss'
                }
            }
        },
        
        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: 'sass',
                    cssDir: 'css/parts',
                    environment: 'production',
                    specify: ['scss/*.scss']
                }
            },
            dev: {  
                options: {
                    sassDir: 'scss',
                    cssDir: 'css/parts',
                    specify: ['scss/*.scss']
                }
            }
        },


        watch: {
            options: { livereload: true },
            scripts: {
                files: ['js/src/*.js', 'js/lib/*.js'],
                tasks: ['concat:script', 'uglify','notify:script'],
                options: {
                    spawn: false
                }
            },
            
            css: {
                files: ['scss/*.scss', 'css/parts/*.css', 'scss/bootstrap/*.scss', 'scss/climacons/*.scss'],
                tasks: ['sass','compass:dev','concat:css','notify:css'],
                options: {
                    spawn: false
                }
            },

            svg: {
                files: ['img/src/*.svg'],
                tasks: ['svgmin','svg2png','notify:images'],
                options: {
                    spawn: false
                }
            },

            livereload: {
                options: { livereload: true },
                files: ['css/**/*', '*.{html,php,tpl}']
            }
        },

        notify: {
            css: {
                options: {
                    title: 'Stylesheet processed', 
                    message: 'All stylesheets have been processed, compiled and merged in /css/style.css',
                }
            },
            script: {
                options: {
                    title: 'Scripts combined', 
                    message: 'All javascripts have been processed and merged in /js/script.js',
                }
            },
            images: {
                options: {
                    title: 'Task Complete', 
                    message: 'All images have been optimized/compressed',
                }
            }
        }

  });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-svg2png');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-notify');


    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', [
        'watch'
    ]);

    grunt.registerTask('build', [
        'uglify',
        'imagemin'
    ]);

};
