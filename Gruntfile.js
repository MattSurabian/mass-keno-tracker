module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'js/app/*.js', 'js/models/*.js', 'js/views/*.js', 'js/collections/*.js']
        },
        requirejs: {
            compile: {
                options: {
                    name: "main",
                    baseUrl: "js/",
                    mainConfigFile: "js/main.js",
                    paths: {
                        requireLib: "libs/require"
                    },
                    include: ["requireLib"],
                    out: "optimized.js"

                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    // Default task(s).
    grunt.registerTask('default', ['jshint', 'requirejs']);

};