module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    jshint: {
      files: [
        'app/*.js',
        'app/**/*.js',
        '*.js'
      ],
      options: {
        force: false,
        reporterOutput: '',
        jshintrc: '.jshintrc'
        // ignores: [
        //   'public/lib/**/*.js',
        //   'public/dist/**/*.js'
        // ]
      }
    }

  });

  ///// grunt.loadNpmTasks('nameOfPackage');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');


  ///// main grunt tasks

  grunt.registerTask('build', [
    'jshint'
  ]);

};