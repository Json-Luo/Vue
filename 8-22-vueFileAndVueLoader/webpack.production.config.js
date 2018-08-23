/*
 * 生产环境的 webpack 配置
 * npm install uglifyjs-webpack-plugin --save-dev   用于压缩 js 代码
 */

var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPligin = require('extract-text-webpack-plugin');
var merge = require('webpack-merge');
var webpackBaceConfig = require('./webpack.config');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 在 15.x.x 版本以后的 vue-loader 必须要带上这个插件
var VueLoaderPlugin = require('vue-loader/lib/plugin');

// 清空插件列表
webpackBaceConfig.plugins = [];
// 将新的配置合并到老的中去，相同的覆盖
module.exports = merge(webpackBaceConfig, {
    output: {
        publicPath: '/dist/',
        // 给文件名加hash值，是为了使文件名唯一，这样只要不对html文件设置缓存，上线后立即就可以加载最新的静态资源
        filename: '[name]-[hash].js'
    },
    mode: 'production',
    plugins: [
        new extractTextPligin({
            // 提取 css 并重命名成带有 hash 值的唯一文件名
            filename: '[name]-[hash].css',
            allChunks: true
        }),
        // 定义当前 node 环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // 提取模板文件，并保存入口 html 文件
        new htmlWebpackPlugin({
            filename: 'index_product.html',
            template: 'index.ejs',
            inject: false
        }),
        new VueLoaderPlugin(),
    ],
    // 压缩 js 代码
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ]
    }
});
