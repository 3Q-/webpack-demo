'use strict';

module.exports = function(gulp, gulpPlugins, projectList, tools) {

    gulp.task('revAll', function() {

        var revAll = new gulpPlugins.revAll({
            dontRenameFile: [/^\/favicon.ico$/g, '.html']
        });
        tools.mergeProjectTask(projectList, function(project, CONFIG) {

            return gulp.src([CONFIG.cssDist+'/**/*.css', './src/htmls/**'])
                .pipe(revAll.revision())
                .pipe(gulp.dest('./'));

        });

    });

};
