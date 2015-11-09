'use strict';

module.exports = function(gulp, gulpPlugins, projectList, tools) {

    gulp.task('tmodjs', function() {

        tools.mergeProjectTask(projectList, function(project, CONFIG) {

            return gulp.src(CONFIG.tplSrc + '/**/*.html')
                .pipe(gulpPlugins.changed(CONFIG.tplDist, {
                    extension: '.js'
                }))
                .pipe(gulpPlugins.tmod({
                    base: CONFIG.tplSrc,
                    combo: false,
                    minify: false,
                    cache: false,
                    type: 'commonjs',
                    helpers: './helpers/tmod.js',
                    output: CONFIG.tplDist
                }))
                ;
        });

    });

};
