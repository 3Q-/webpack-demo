'use strict';

module.exports = function(gulp, gulpPlugins, projectList, tools) {

    gulp.task('compass', function() {
        tools.mergeProjectTask(projectList, function(project, CONFIG) {
            return gulp.src(CONFIG.sassSrc + '/**/*.scss')
                .pipe(gulpPlugins.compass({
                    generated_images_path: CONFIG.imageDist,
                    comments: true,
                    relative: true,
                    config_file: './config.rb',
                    css: CONFIG.cssDist,
                    sass: CONFIG.sassSrc,
                    image: CONFIG.imageSrc,
                }))
                .on('error', function(error) {
                    // Would like to catch the error here
                    gulpPlugins.gutil.log(error);
                    this.emit('end');
                });
            //.pipe(gulp.dest(cssDist));
        });

    });

};
