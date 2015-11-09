'use strict';

module.exports = function(gulp, gulpPlugins, projectList, tools) {

    gulp.task('imagemin', function() {

        tools.mergeProjectTask(projectList, function(project, CONFIG) {
            return gulp.src(CONFIG.imageSrc+'/**/*.{png,jpg,gif,ico}')
                .pipe(gulpPlugins.imagemin({
                    progressive: true,
                    svgoPlugins: [{
                        removeViewBox: false
                    }],
                    use: [gulpPlugins.pngquant()]
                }))
                .pipe(gulp.dest(CONFIG.imageDist));
        });

    });

};
