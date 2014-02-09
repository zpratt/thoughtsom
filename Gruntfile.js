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
        mochacov: {
            options: {
                reporter: 'spec',
                ui: 'bdd'
            },
            all: ['test/unit/server/**/*.spec.js'],
            bdd_server: ['test/acceptance/server/*.spec.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha-cov');

    // Default task.
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('test', ['unit:server', 'unit:ui', 'bdd']);
    grunt.registerTask('unit:server', ['jshint', 'mochacov:all']);
    grunt.registerTask('unit:ui', ['jshint', 'karma']);
    grunt.registerTask('bdd', ['mochacov:bdd_server']);
};
