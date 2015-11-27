module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        files: {
          '../_includes/minified.min.js': ['scripts/*.js'],
          '../assets/scripts/samples.min.js': ['../assets/scripts/samples/*.js']
        }
      }
    },
    sass: {
      dev: {
        options: {
          sourcemap: 'none',
          outputStyle: 'expanded'
        },
        files: [{
          // Files in the /sass/ directory will go to /static/css/ when processed.
          expand: true,
          src: ['style.scss'],
          dest: '../assets/css/',
          ext: '.css'
        }, {
          expand: true,
          src: ['../assets/altstylesheets/samples.scss'],
          dest: '../altstylesheets/',
          ext: '.css'
        }]
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('autoprefixer')({browsers: 'last 1 version'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: '../assets/css/style.css',
        dest: '../assets/css/style.min.css'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      pages: {
        files: ['../_site/index.html']
      },
      scripts: {
        files: ['scripts/*.js', '../assets/scripts/samples/*.js'],
        tasks: ['uglify']
      },
      sass: {
        files: ['sass/*.scss', 'style.scss', '../assets/altstylesheets/samples.scss'],
        tasks: ['sass']
      },
      postcss: {
        files: ['../_site/assets/css/style.css'],
        tasks: ['postcss']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['watch']);
};
