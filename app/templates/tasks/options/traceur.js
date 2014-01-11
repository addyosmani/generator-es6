module.exports = {
	options: {
	    sourceMaps: true
	},
	custom: {
		files: [{
		    expand: true,
		    cwd: 'app',
		    src: 'lib/*.traceur.js',
		    dest: 'tmp/traceured/'
		}]
	}
};
