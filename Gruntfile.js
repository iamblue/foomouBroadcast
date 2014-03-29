// Generated on 2013-11-22 using generator-angular 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'


var LIVERELOAD_PORT = 35734;
var modRewrite = require('connect-modrewrite');
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  var modRewrite = require('connect-modrewrite');
  // grunt.loadNpmTasks('grunt-html-snapshot');
  grunt.loadNpmTasks('grunt-manifest-ext');
  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      test: require('./bower.json').testPath || 'test',
      dist: 'dist'
    },
    // htmlSnapshot: {
    //   all: {
    //     options: {
    //       snapshotPath: 'snapshots/',
    //       msWaitForPages: 3000,
    //       urls: [
    //         'http://localhost:9000',
    //         'http://localhost:9000/i/choose',
    //         'http://localhost:9000/preorder/12',
    //         'http://localhost:9000/project/choose/19'
    //       ]
    //     }
    //   }
    // },
    manifest: {
      generate: {
        options: {
          basePath: '<%= yeoman.dist %>/',
          cache: [],
          network: ['http://*', 'https://*'],
          // fallback: ['/ /offline.html'],
          // exclude: ['scripts/1cfc8c1f.app.js','cef5df89.modules.js'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          hash: true,
          master: ['index.html']
        },
        src: [
          'views/**/*.html',
          'views/*.html',
          'scripts/**/*.js',
          'scripts/*.js',
          'styles/*.min.css',
          'img/**/*',

        ],
        dest: '<%= yeoman.dist %>/manifest.appcache'
      }
    },
    watch: {
      livescript: {
        files: ['<%= yeoman.app %>/src/{,*/}*.ls'],
        tasks: ['livescript:dist']
      },
      livescriptTest: {
        files: ['test/src/{,*/}*.ls'],
        tasks: ['livescript:test']
      },
      stylus: {
        files: [
          '<%= yeoman.app %>/stylus/{,*/}*.styl'
        ],
        tasks: ['stylus']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        // tasks: ['copy:styles', 'autoprefixer']
        tasks: ['copy:styles']
         
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]

      }
    },
    
    // autoprefixer: {
    //   options: ['last 1 version'],
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '.tmp/styles/',
    //       src: '{,*/}*.css',
    //       dest: '.tmp/styles/'
    //     }]
    //   }
    // },
    connect: {
      options: {
            port: 9011,
            // Change this to '0.0.0.0' to access the server from outside.
            hostname: 'localhost',
            livereload: 35734,
            middleware: function (connect, options) {
          var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
          return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
            optBase.map(function(path){ return connect.static(path); }));
        }
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9002,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      scripturl:false,
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    livescript: {
      options: {
        sourceMap: true,
        sourceRoot: '',
        bare:true
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/src',
          src: '{,*/}*.ls',
          dest: '<%= yeoman.app %>/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.test %>/src',
          src: '{,*/}*.ls',
          dest: '<%= yeoman.test %>/spec',
          ext: '.js'
        }]
      }
    },
    stylus: {
      compile: {
        options: {
          compress: true,
          paths: ['node_modules/grunt-contrib-stylus/node_modules']
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/stylus',
          src: '{,*/}*.styl',
          dest: '<%= yeoman.app %>/styles',
          ext: '.css'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            //'<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*',
            'scripts/{,*/}*.js',
            'views/{,*/}{,*/}{,*/}*.html',
            'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'livescript:dist',
        'copy:styles'
      ],
      test: [
        'livescript',
        'copy:styles'
      ],
      dist: [
        'livescript',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      server: {
        configFile: 'karma.conf.js',
        singleRun: false,
        autoWatch: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts/ng/{,*/}*',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts/ng/{,*/}*'
        }]
      }
    },
    uglify: {
      // options: {
      //   mangle: false
      // },
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/ng/controller.js': [
            '<%= yeoman.dist %>/scripts/ng/controller.js'
          ]
        }
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      // 'autoprefixer',
      'connect:livereload',
      // 'htmlSnapshot',
      'watch'
    ]);
  });


  grunt.registerTask('compass', ['stylus']);

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    // 'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    // 'autoprefixer',
    'concat',
    'copy:dist',
    // 'cdnify',
    'imagemin',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'manifest'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build',
    
  ]);
};
