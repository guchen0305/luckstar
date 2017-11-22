var gulp = require('gulp'),
    connect = require('gulp-connect'),//使用connect启动一个Web服务器
    minifyCSS = require('gulp-minify-css');

var src = {
    html: ['./*.html', '*.html'],
    css:['css/*.css', './css/*.css'],
}


gulp.task('connect', function() {
    connect.server({
        port: 8888,
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});
gulp.task('mincss',function(){
    gulp.src(src.css)
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('html', function() {
    gulp.src(src.html)
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('./css/*.css', ['mincss']); //监控css文件
    gulp.watch('js/*.js', ['html']); //监控js文件
    gulp.watch(['*.html'], ['html']); //监控html文件
}); //执行gulp server开启服务器

gulp.task('server', ['connect', 'watch']);