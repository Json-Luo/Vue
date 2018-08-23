/*
 * 1. npm init
 * 2. npm install webpack webpack-cli webpack-dev-server vue vue-loader vue-style-loader vue-template-compiler vue-hot-reload-api babel babel-core babel-loader
 *    babel-runtime babel-preset-es2015 babel-plugin-transform-runtime url-loader file-loader webpack-merge html-webpack-plugin --save-dev
 * 3. 因为 extract-text-webpack-plugin 不支持 webpack 4.0 以上版本，所以要安装 npm install extract-text-webpack-plugin@next --save-dev
 */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// 在 15.x.x 版本以后的 vue-loader 必须要带上这个插件
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        main: './main'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    // fallback 是指使用什么样的 loader 去提取 css 文件
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpe?g|png|woff|svg|eot|ttf\??.*$)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // 文件小于 1kb 就会以 base64 的形式加载
                        limit: 1024
                    }
                }
            }
        ]
    },
    mode: 'development',
    plugins: [
        new ExtractTextPlugin('main.css'),
        new VueLoaderPlugin()
    ]
};