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
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                reporters: 'mocha',
                runnerPort: 9998
            },
            bdd: {
                configFile: 'karma-bdd.conf.js',
                singleRun: true,
                reporters: 'mocha',
                runnerPort: 9999
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
        },
        browserify: {
            options: {
//                transform: ['uglifyify'],
                transform: ['hbsfy'],
                debug: true
            },
            all: {
                files: [{
                    src: [
                        'node_modules/backbone/node_modules/underscore/underscore.js',
                        'node_modules/backbone/backbone.js',
                        'src/ui/**/*.js'
                    ],
                    dest: 'build/main.js',
                    ext: '.js'
                }]
            }
        },
        copy: {
            options: {
                encoding: 'utf8'
            },
            dist: {
                files: [
                    { expand: true, filter: 'isFile', flatten: true, src: ['src/ui/*.html'], dest: 'public/' },
                    { expand: true, filter: 'isFile', flatten: true, src: ['build/*.js'], dest: 'public/js/' },
                    { expand: true, filter: 'isFile', flatten: true, src: ['bower_components/bootstrap/dist/css/bootstrap.min.css'], dest: 'public/css/' }
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['jshint', 'test', 'client', 'server']);
    grunt.registerTask('build', ['jshint', 'test', 'browserify:all', 'copy:dist']);
    grunt.registerTask('client', ['browserify:all', 'copy:dist']);
    grunt.registerTask('server', ['nodemon']);
    grunt.registerTask('test', ['unit:server', 'unit:ui', 'bdd:server', 'bdd:ui']);
    grunt.registerTask('unit:server', ['mochacov:unit']);
    grunt.registerTask('unit:ui', ['karma:unit']);
    grunt.registerTask('test:unit', ['unit:server', 'unit:ui']);
    grunt.registerTask('bdd:ui', ['karma:bdd']);
    grunt.registerTask('bdd:server', ['mochacov:bdd_server']);
    grunt.registerTask('test:bdd', ['bdd:server', 'bdd:ui']);
};
