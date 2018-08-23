/*
 * 1. 初始化操作
 *      npm init
 *      npm install webpack webpack-cli vue vue-router --save-dev                                                               // 基本环境依赖
 * 2. loaders 安装
 *      npm install babel babel-core babel-loader babel-preset-es2015 babel-runtime babel-plugin-transform-runtime --save-dev   // es6 相关依赖
 *      npm install css-loader style-loader url-loader file-loader --save-dev                                                   // 处理样式文件依赖
 *      npm install vue-loader vue-hot-reload-api vue-style-loader vue-template-compiler --save-dev                             // vue 文件处理相关 loader
 *      npm intsall html-webpack-plugin uglifyjs-webpack-plugin webpack-dev-server --save-dev                                   // 文件引入文件压缩相关
 *      npm install --save-dev extract-text-webpack-plugin@next                                                                 // 针对 webpack 4.0 以上版本的插件
 */
var path = require('path');
var extractTextPlugin = require('extract-text-webpack-plugin');
var vueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: path.resolve(__dirname, './src/js/main.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        publicPath: '/dist/',
        // 使用了异步路由之后，编译出的每个页面的 js 都叫做 chunk 默认命名为 0.main.js、1.main.js，我们通过 chunkFilename 修改 chunk命名
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    mode: 'development',
    plugins: [
        new extractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new vueLoaderPlugin()
    ]
};