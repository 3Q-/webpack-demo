ps:  因为用了gulp4.0  api不是很懂 代码组织比较乱 大家慢慢看

命令输入
npm install
安装完成 输入
gulp  开发服务  时时刷新,监听文件变化
gulp build  打包上线代码
guil build-dev  打包开发代码




以下是静态文件准备好的情况运行
1.开发
webpack-dev-server --hot --inline
访问 localhost:8888/webpack-dev-server 可以访问编译后(在你的文件夹里看不到,听说存在内存里了^.^)的的文件,可以保存刷新,但是修改html无效(鄙视);

2.打包
webpack -p 生成打包后的文件 dist/
ps: 在src/html页面里不会自动把<img/>引用到的图片移到dist 目录下; 在解决中.

3.打包没有混淆的代码 (没有压缩)
webpack 生成打包后的文件 dist/



4.跟gulp结合使用自己看吧
