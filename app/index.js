'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var Es6Generator = module.exports = function Es6Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Es6Generator, yeoman.generators.Base);


Es6Generator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};


Es6Generator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/loader');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('loader.js', 'app/loader/loader.js');
};

Es6Generator.prototype.gruntfile = function gruntfile() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

Es6Generator.prototype.sampleModule = function sampleModule() {
  this.mkdir('app/lib');
  this.mkdir('app/lib/my_library');
  this.mkdir('app/tmp');

  this.copy('my_library.js','app/lib/my_library.js');
  this.copy('shout.js','app/lib/my_library/shout.js');
  this.copy('ssshh.js','app/lib/my_library/ssshh.js');
};

Es6Generator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
