module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {

            dist: {
                src: [ 'grunt/js/**/**.*','grunt/js/**.*'],
                dest: 'public/js/main.js'
            }
        },
        uglify: {
            src: 'grunt/js/*.js',
            dist: {
                files: {
                    'public/js/main.min.js': ['&lt;%= concat.dist.dest %&gt;']
                }
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/main.css' : 'grunt/scss/main.scss'
                }
            }
        },
        bower_concat: {
            all: {
                dest: 'public/global.js',
                dependencies: {
                    'underscore': 'jquery',
                    'backbone': 'underscore'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'grunt/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            css: {
                files: '**/*.sass',
                tasks: ['sass'],
                options: {
                    livereload: true
                },
            },
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint',  'concat', 'bower_concat', 'uglify',  'sass']);

    grunt.registerTask('watch');

};