module.exports = function (grunt) {
    //grunt wrapper function 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //grunt task configuration will go here  
        uglify: {
            options: {
                sourceMap: true,
                mangle: false
            },
            dev: {
                //              files:[{
                //                expand:true,
                //                cwd:'user-log/js',
                //                src:['*.js','!*.min.js'],
                //                dest:'user-log/js/min',
                //                ext: '.mine.js'
                //              }] 
                files: {
                    'user-log/js/min/minifiedjs.js': [
                        // using whichever order of importance you need
                        'user-log/js/*.js',
                        '!user-log/js/*.min.js'
                    ]
                }
            }
        },
        cssmin: {
            options: {
                sourceMap: true
            },
            dev: {
                files: [{
                        expand: true,
                        cwd: 'user-log/css',
                        src: ['*.css', '!*.min.css'],
                        dest: 'user-log/css/min',
                        ext: '.mine.css'
                    }]
            }
        },
        less: {
            production: {
                options: {
                    paths: ['assets/css'],
                    plugins: [
                        new (require('less-plugin-autoprefix'))({
                            browsers: ["last 2 versions"]
                        }),
                        new (require('less-plugin-clean-css'))({
                            compatibility: 'ie9'
                        })
                    ]
                },
                files: {
                    'user-log/css/styles.css': 'user-log/css/styles.less'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-livereload');
    grunt.registerTask('default', ['livereload']);

}