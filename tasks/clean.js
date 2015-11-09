'use strict';

module.exports = function(gulp, gulpPlugins, projectList, tools) {

    gulp.task('clean', function() {

        tools.mergeProjectTask(projectList, function(project, CONFIG) {
            return gulp.src(['./dist/' + project, CONFIG.tplDist], {
                    read: true
                })
                .pipe(gulpPlugins.clean());
        });

    });

};
