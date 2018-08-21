/*
 *  使用 loader 的三种方式
 *  1. 在 require 的时候在文件前面添加 loader  e.g.  require('css-loader!./style.css')
 *  2. 在 webpack 的配置中设置
 *  3. 在 cli 中使用 loader  e.g.  webpack --module-bind "css=style-loader!css-loader"
 */
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
    },
    // 在配置文件中使用 loader
    module: {
        // 在 webpack 4.0 中使用 rules 而不是 loaders
        rules: [
            {
                /*
                 * test 指定文件规则 以 js 结尾  安装解析 ES6 的 babel loader: npm install babel-loader babel-core --save-dev
                 * 给 loader 传递参数的也有三种方式 ( 对应使用 loader 的三种方式 )
                 *    1. require 的时候传递参数 e.g.  require("url-loader?mimetype=image/png!./file.png")
                 *    2. 在配置文件中指定 { test: /\.png$/, loader: "url-loader?mimetype=image/png"}
                 *                 或者 {
                 *                          test: /\.png$/,
                 *                          loader: "url-loader",
                 *                          query: { mimetype: "image/png" }
                 *                      }
                 *    3. 在 cli 中指定 e.g. webpack --module-bind "png=url-loader?mimetype=image/png"
                 */
                test: /\.js$/,
                // 在高版本中 loader 使用 use 代替，值可以是 string、array、object
                // use: {
                //     loader: 'babel-loader',
                //     query: {
                //         presets: ["latest"]
                //     }
                // },
                loader: 'babel-loader',
                // babel 转换语法其实很耗时，所以我们可以优化一些东西，就是 node_modules 目录下打包好的 js 文件过滤掉，不进行 babel 处理，务必要使用绝对路径
                exclude: path.resolve(__dirname, 'node_modules'),
                // babel 只处理 src 目录下的 js 文件
                include: path.resolve(__dirname, 'src'),
                query: {
                    /*
                     * 给 babel 指定 presets 的三种方式
                     * 1. 该插件参数的作用就是让 babel 按照什么样子来处理我们的 js 文件，latest 就是最新的 使用所有特性， 也可以是 ES2015 但是那样的话有些特性不支持
                     * presets 其实是一个插件 所以要安装该插件  npm install babel-preset-latest --save-dev
                     * 2. 我们也可以通过另外一种方式来指定 presets 配置，在项目根目录创建一个 .babelrc 文件，文件内容就是 { presets: ["es2015"] }
                     * 3. 在 package.json 中指定 presets  e.g.  "babel": {
                     *                                            "presets": ["es2015"]
                     *                                         }
                     */
                    // presets: ['es2015'],
                    presets: ['latest']
                }
            }
        ]
    },
    mode: 'development',
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body'
        }),
    ]
};