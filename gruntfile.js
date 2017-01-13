module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    tslint: {
      options: {
        configuration: {
          extends: "tslint:recommended",
          rules: {
            typedef: true,
            curly: true,
            "no-conditional-assignment": true,
            "no-empty": true,
            "no-eval": true,
            "no-invalid-this": true,
            "no-unsafe-finally": true,
            "no-unused-new": true,
            "no-unused-variable": true,
            "no-var-keyword": true,
            "triple-equals": true,
            "use-isnan": true,
            "max-classes-per-file": 3,
            "indent": [true, "spaces"],
            "max-file-line-count": 500,
            "prefer-const": true,
            "no-trailing-whitespace": true,
            "align": true,
            "class-name": true,
            "new-parens": true,
            "one-variable-per-declaration": true,
            semicolon: true,
            "variable-name": [true, "ban-keywords", "check-format", "allow-leading-underscore"]
          }
        }
      },
      default: {
        files: {
          src: ['src/**/*.ts']
        }
      },
      test: {
        files: {
          src: ['tests/**/*.ts']
        }
      }
    },
    browserify: {
      options: {
        browserifyOptions: {
          plugin: [['tsify', {target: "es5"}]]
        }
      },
      build: {
        files: {
          'compiled/pixi-hexgrid.js': ["src/**/*.ts"]
        }
      },
      test: {
        options: {
          browserifyOptions: {
            plugin: [['tsify', {target: "es6"}]],
            debug: true
          }
        },
        files: {
          'tests/main.js': ["tests/**/*.ts"]
        }
      },
      ut_utilities: {
        options: {
          browserifyOptions: {
            plugin: [['tsify', {target: "es5"}]], //targeting es5 because phantomjs does not support 6. Maybe update when phantom is updated
            debug: true
          }
        },
        files: {
          'tests/compiled/utilities_spec.js': ['tests/specs/utilities/*.ts']
        }
      }
    },
    ts: {
      options: {
        target: "es5",
        declaration: true,
        declarationDir: 'compiled/typings'
      },
      build_umd: {
        options: {
          module: 'umd'
        },
        files: [
          {src: 'src/**/*.ts', dest: 'compiled/umd'}
        ]
      },
      build_amd: {
        options: {
          module: 'amd'
        },
        files: [
          {src: 'src/**/*.ts', dest: 'compiled/amd'}
        ]
      },
      build_es6: {
        options: {
          module: 'es6',
          target: "es6"
        },
        files: [
          {src: 'src/**/*.ts', dest: 'compiled/es6'}
        ]
      }
    },
    karma: {
      options: {
        frameworks: ['jasmine'],
        browsers: ['PhantomJS', 'Firefox']
      },
      ut_utilities: {
        options: {
          files: [
            {pattern: 'tests/compiled/utilities_spec.js', watched:true}
          ]
        }
      }
    },
    typedoc: {
      build: {
        options: {
          module: 'commonjs',
          out: 'documentation',
          target: 'es5',
          name: 'Pixi HexGrid'
        },
        src: ['./src/**/*.ts']
      }
    }
  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-typedoc");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-karma");

  grunt.registerTask("build", ['tslint:default', 'browserify:build', 'typedoc:build'])
  grunt.registerTask("unit_tests", ["tslint:default", "tslint:test", "browserify:ut_utilities", "karma:ut_utilities"]);
  grunt.registerTask("default", ["build"]);
  grunt.registerTask("compile_ts", ["ts:build_umd", "ts:build_amd", "ts:build_es6"]);
}