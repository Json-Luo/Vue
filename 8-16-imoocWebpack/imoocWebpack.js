/*
 * Imooc 慕课网 webpack 教程
 *
 * How is Webpack different?
 * 1. code splitting 代码分割
 * 2. loaders
 * 3. plugins
 * 4. 模块热更新
 *
 * 安装 webpack
 * 1. 新建文件夹
 * 2. npm init    初始化 npm
 * 3. npm install webpack --save-dev   本地局部安装 webpack
 *
 * 使用 webpack
 * 1. webpack imoocWebpack.js -o bundle.js --mode development
 *    将本文件打包成 bundle.js   -o 输出文件  --mode development 指定开发环境，由于性能问题，默认是 production 默认压缩代码
 *    打包信息：
 *    Hash: 4652db2154b3712ab1ef                            打包 Hash 唯一值
 *    Version: webpack 4.16.2                               打包 webpack 的版本
 *    Time: 81ms                                            打包时间
 *    Built at: 2018-08-16 13:32:31                         Asset 输出文件 Size 输出文件大小 Chunks 块  Chunk Names 块名称
 *      Asset     Size      Chunks             Chunk Names
 *    bundle.js  4.29 KiB    main    [emitted]  main
 *    Entrypoint main = bundle.js
 *    [./imoocWebpack.js] 470 bytes {main} [built]
 * 2. 引入 world.js 重新打包
 * 3. 引入 style.css 文件打包时报错，webpack 原本不支持处理 css 文件，所以要安装适当的 loader 来处理这些文件
 *    npm install css-loader style-loader --save-dev  本地局部安装 css loader(处理 css 文件) 和 style loader(处理 css 样式，以 style 标签插入)
 *    打包进 js 文件的 css 样式其实是以 style 标签的形式插入页面的
 *    也可以在命令行中指定 loader 来处理文件 webpack imoocWebpack.js -o bundle.js --module-bind "css=style-loader!css-loader" windows 注意双引号
 * 4. webpack 参数
 *    --watch               文件发生改变自动打包
 *    --progress            查看打包过程
 *    --display-modules     列出所有引用的打包模块（使用哪些 loader 处理也会列出来）
 *    --display-reasons     列出为什么要去打包这个模块的原因
 *    --colors              打包字体彩色显示
 *
 */

require('./world.js');
// 在打包 style.css 的时候先经过 css-loader 的处理
// require('style-loader!css-loader!./style.css');
require('./style.css');

function hello(str) {
    alert(str);
}

hello('hello world!!!!');