module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: {
          // if concat and uglify breaks angular, we need to use ngAnnotate
          // to fix it...
        }
      }
    },

    nodemon: {
      dev: {
        script: 'index.js'
      }
    },

    concat: {
      options: {
    // define a string to put between each file in the concatenated output
      separator: ';'
      },
    dist: {
    // the files to concatenate
      src: ['app/**/*.js', 'app/*.js'],
    // the location of the resulting JS file
      dest: 'app/dist/<%= pkg.name %>.js'
    }

    },

    uglify: {
      options: {
    // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
    dist: {
      files: {
        'app/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    },

    jshint: {
      files: [
        'app/*.js',
        'app/**/*.js',
        'controllers/*.js',
        'db/*.js',
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
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');

  ///// main grunt tasks

  grunt.registerTask('build', [
    'jshint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

};