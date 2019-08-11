module.exports = function(grunt) {

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					'css/main.css': 'scss/main.scss'
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css/',
					src: ['*.css', '!*.min.css'],
					dest: 'css/',
					ext: '.min.css'
				}]
			}
		},
		watch: {
			indexSass: {
				files: ['scss/*.scss'],
				tasks: ['sass', 'cssmin'],
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);

}