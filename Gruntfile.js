module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            test: {
                src: ['test/**/*.js']
            },
            production: {
                src: ['src/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'karma:all']
            }
        },
        nodemon: {
            dev: {
                script: './src/server/index.js',
                options: {
                    delay: 5,
                    nodeArgs: ['--debug']
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            all: {
                singleRun: true,
                reporters: 'dots'
            }
        },
        mochacov: {
            options: {
                ui: 'bdd',
                colors: true
            },
            unit: {
                options: {
                    reporter: 'spec',
                    files: ['test/unit/server/**/*.spec.js']
                }
            },
            bdd_server: {
                options: {
                    reporter: 'spec',
                    files: ['test/acceptance/server/*.spec.js']
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-cov');

    // Default task.
    grunt.registerTask('default', ['jshint', 'test', 'server']);
    grunt.registerTask('server', ['nodemon']);
    grunt.registerTask('test', ['unit:server', 'unit:ui', 'bdd']);
    grunt.registerTask('unit:server', ['jshint', 'mochacov:unit']);
    grunt.registerTask('unit:ui', ['jshint', 'karma']);
    grunt.registerTask('bdd', ['mochacov:bdd_server']);
};
