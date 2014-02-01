'use strict';

module.exports = function (grunt) {

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
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            all: {
                singleRun: true,
                reporters: 'dots'
            }
        },
        cucumberjs: {
            src: 'test/acceptance/features/',
            options: {
                steps: 'test/acceptance/features/step_definitions/',
                format: 'pretty'
            }
        },
        mochacov: {
            options: {
                reporter: 'spec',
                ui: 'bdd'
            },
            all: ['test/unit/server/**/*.spec.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-cov');
    grunt.loadNpmTasks('grunt-cucumber');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['test:server', 'test:ui']);
    grunt.registerTask('test:server', ['jshint', 'mochacov:all']);
    grunt.registerTask('test:ui', ['jshint', 'karma']);
    grunt.registerTask('bdd', ['cucumberjs']);
};
