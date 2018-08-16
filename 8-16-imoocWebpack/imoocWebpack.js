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
 * 1. webpack imoocWebpack.js -o bundle.js --model development
 *    将本文件打包成 bundle.js   -o 输出文件  --model development 指定开发环境，由于性能问题，默认是 production 默认压缩代码
 *    打包信息：
 *    Hash: 4652db2154b3712ab1ef                            打包 Hash 唯一值
 *    Version: webpack 4.16.2                               打包 webpack 的版本
 *    Time: 81ms                                            打包时间
 *    Built at: 2018-08-16 13:32:31                         Asset 输出文件 Size 输出文件大小 Chunks 块  Chunk Names 块名称
 *      Asset     Size      Chunks             Chunk Names
 *    bundle.js  4.29 KiB    main    [emitted]  main
 *    Entrypoint main = bundle.js
 *    [./imoocWebpack.js] 470 bytes {main} [built]
 */

function hello(str) {
    alert(str);
}