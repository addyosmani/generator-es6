module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-es6-module-transpiler");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.initConfig({
    transpile: {
      amd: {
        type: 'amd',
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['**/*.js'],
          dest: 'tmp/',
          ext: '.amd.js'
        }]
      },

      commonjs: {
        type: 'cjs',
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['my_library/*.js'],
          dest: 'dist/commonjs/',
          ext: '.js'
        },
        {
          src: ['lib/my_library.js'],
          dest: 'dist/commonjs/main.js'
        }]
      }
    },
    concat: {
      amd: {
        src: "tmp/**/*.amd.js",
        dest: "dist/my_library.amd.js"
      },
    },
    browser: {
      dist: {
        src: ["vendor/loader.js", "dist/my_library.amd.js"],
        dest: "dist/my_library.js",
        options: {
          barename: "my_library",
          namespace: "MyLibrary"
        }
      }
    }
  });

  grunt.registerMultiTask('browser', "Export a module to the window", function() {
    var opts = this.options();
    this.files.forEach(function(f) {
      var output = ["(function(globals) {"];

      output.push.apply(output, f.src.map(grunt.file.read));

      output.push(grunt.template.process(
        'window.<%= namespace %> = requireModule("<%= barename %>");', { 
        data: {
          namespace: opts.namespace,
          barename: opts.barename
        }
      }));
      output.push('})(window);');

      grunt.file.write(f.dest, grunt.template.process(output.join("\n")));
    });
  });

  grunt.registerTask("default", ["transpile", "concat:amd", "browser"]);
}